const userManagement = require('../db/userManagement');
const jwt = require('jsonwebtoken');

async function redirectToGoogleSignIn(request, reply) {
	console.log('-> route to /api/auth/google');
	const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');

	url.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID);
	url.searchParams.set('redirect_uri', process.env.REDIRECT_URI);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('scope', 'openid email profile');

	console.log('-> redirecting to google sign in');
	reply.redirect(url.toString());
}

async function useCodeToGetToken(code) {
	console.log('✅ got code from google after user signing in');

	const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
		body: new URLSearchParams({
			code,
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_secret: process.env.GOOGLE_CLIENT_SECRET,
			redirect_uri: process.env.REDIRECT_URI,
			grant_type: 'authorization_code'
		})
	});
	console.log('✅ got tokenRes from google');
	return tokenRes;
}

async function getUserFromToken(tokenRes) {
	const tokenData = await tokenRes.json();
	const access_token = tokenData.access_token;

	const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
		headers: { Authorization: `Bearer ${access_token}`} // Bearer: http auth standard
	});
	console.log('✅ access_token requested user info');

	const userInfo = await userInfoRes.json();
	const { email, id: google_id, name } = userInfo;

	let user = await userManagement.findUserByEmail(email);
	if (!user) {
		console.log('✅ creating user...');
		await userManagement.createUser({ email, google_id, name});
		user = await userManagement.findUserByEmail(email);
	}
	return user;
}

async function callbackRedirect(request, reply) {
	const code = request.query.code;
	reply.redirect(`${process.env.FRONTEND_URL}/login?code=${code}`);
}

async function handleGoogleCallback(request, reply) {
	const code = request.body.code;
	const tokenRes = await useCodeToGetToken(code);
	const user = await getUserFromToken(tokenRes);

	const token = jwt.sign(
		{ id: user.id, email: user.email }, 
		process.env.JWT_SECRET, 
		{ expiresIn: '1h' });

	// const isLocalhost = request.headers.origin?.includes('localhost');
	// 	reply.header('Set-Cookie', 
	// 		`jwt=${token}; HttpOnly; Path=/; SameSite=${isLocalhost ? 'Lax' : 'None'}; Max-Age=3600${isLocalhost? '' : '; Secure'}`);

	// console.log('✅ got jwt now redirecting...');
	reply.setJwtCookie(token).send({ success: true });
}

async function remoteSignIn(fastify) {
	fastify.get('/api/auth/google', redirectToGoogleSignIn);
	fastify.get('/api/auth/google/callback', callbackRedirect);
	fastify.post('/api/auth/exchange', handleGoogleCallback);
}

module.exports = remoteSignIn;

// async function handleGoogleCallback(request, reply) {
// 	const code = request.query.code;
// 	const tokenRes = await useCodeToGetToken(code);
// 	const user = await getUserFromToken(tokenRes);

// 	const token = jwt.sign(
// 		{ id: user.id, email: user.email }, 
// 		process.env.JWT_SECRET, 
// 		{ expiresIn: '1h' });
// 	const isLocalhost = request.headers.origin?.includes('localhost');
// 		reply.header('Set-Cookie', 
// 			`jwt=${token}; HttpOnly; Path=/; SameSite=${isLocalhost ? 'Lax' : 'None'}; Max-Age=3600${isLocalhost? '' : '; Secure'}`);
// 	console.log('✅ got jwt now redirecting...');
// 	reply.redirect(`${process.env.FRONTEND_URL}`);
// }
