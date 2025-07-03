const authJwt = require('../middleware/jwtAuthenticator');
const userManagement = require('../db/userManagement');

async function	getUsers(fastify) {
	fastify.get('/api/users', async (request, reply) => {
		try {
			await authJwt(request);
			const users = await userManagement.getUsers();
			reply.send(users);
		}
		catch (err) {
			console.error('❌ get users err: ', err);
			reply.code(500).send({ error: 'get users err' })
		}
	});
}

module.exports = getUsers;
