const bcrypt = require('bcrypt');
const userManagement = require('../db/userManagement');
const { isValidEmail, isValidPassword } = require('../middleware/format');

async function register(fastify, options) {
	fastify.post('/api/register', async(request, reply) => {
		const { email, password } = request.body;
		if (!email || !password)
			return reply.code(400).send({ error: 'email and password must be provided.'});

		if (!isValidEmail(email))
			return reply.code(400).send({ error: 'wrong email format'});

		if (!isValidPassword(password))
			return reply.code(400).send({ error: 'password needs at least 8 characters with upper/lower cases and number'});

		const existing = await userManagement.findUserByEmail(email);
		if (existing)
			return reply.code(400).send({ error: 'Email already registered'});

		const password_hash = await bcrypt.hash(password, 10);
		await userManagement.createUser({ email, password_hash });
		reply.send({ success: true });
	});
}

module.exports = register;
