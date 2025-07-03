const userManagement = require('../db/userManagement');
const authJwt = require('../middleware/jwtAuthenticator');

async function changeName(fastify, opts) {
	fastify.patch('/api/profile/name', async (request, reply) => {
		try {
			const payload = await authJwt(request);
			if (!payload) {
				console.error('❌ maybe jwt expired');
				return reply.code(401).send({ message: 'cannot access the paylaod' });
			}

			const { newName } = request.body;
			await userManagement.updateName(payload.id, newName);
			reply.send({ success: true });
		}
		catch (err) {
			console.error('❌ error during name change', err);
			reply.code(500).send({ message: 'error during name change' });
		}
	});
}

module.exports = changeName;
