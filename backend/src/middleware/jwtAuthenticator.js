// from nodejs OR @fastify/jwt can be used
const jwt = require('jsonwebtoken');

async function jwtAuthenticator(request) {
	try {
		const cookies = request.headers.cookie || '';
		const tokenC = cookies.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1]
		if (!tokenC)
			throw new Error('❌ No token found in cookies');

		const payload = jwt.verify(tokenC, process.env.JWT_SECRET); // catch if fail
		return payload;
	} 
	catch {
		throw new Error('❌ Invalid or expired token'); // in case some other function error
	}
}

module.exports = jwtAuthenticator;
