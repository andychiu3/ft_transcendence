const authJwt = require('../middleware/jwtAuthenticator');
const userManagement = require('../db/userManagement');

async function account(fastify) {
	fastify.delete('/api/account', async (request, reply) => {
		try {
			const payload = await authJwt(request);
			if (!payload) {
				console.log('❌ jwt verification fail may have expired');
				return reply.code(400).send({ message: 'jwt verification failed'});
			}
			await userManagement.deleteAccount(payload.id);
			reply.send({ success: true });
		}
		catch (err) {
			console.err('❌ catch err: ', err);
			reply.code(500).send({ error: 'deletion failed' });
		}
	});	
}

module.exports = account;