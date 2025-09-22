const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userManagement = require('../db/userManagement');
const twoFA = require('../middleware/2FA');

async function login(fastify, opts) {
	fastify.post('/api/login', async (request, reply) => {
		const { email, password, authCode, method } = request.body;

		const user = await userManagement.findUserByEmail(email);
		if (!user)
			return reply.code(401).send({ error: 'Invalid email'});

		const match = await bcrypt.compare(password, user.password_hash);
		if (!match)
			return reply.code(401).send({ error: 'Wrong password'});

		const isCodeValid = await twoFA.verify2FACode(email, authCode, method);
		if (!isCodeValid)
			return reply.code(401).send({ error: 'Invalid or expired 2FA code' });

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1h'}
		);
		// console.log(process.env.JWT_SECRET);
		// const isLocalhost = request.headers.origin?.includes('localhost');
		// reply.header('Set-Cookie', 
		// 	`jwt=${token}; HttpOnly; Path=/; SameSite=${isLocalhost ? 'Lax' : 'None'}; Max-Age=3600${isLocalhost? '' : '; Secure'}`);
	
		reply.setJwtCookie(token).send({ success: true });
	})
}

module.exports = login;
