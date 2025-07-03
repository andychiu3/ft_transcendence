const userManagement = require('../db/userManagement');
const authJwt = require('../middleware/jwtAuthenticator');

async function recordStat(fastify) {
	fastify.patch('/api/stat', async (request, reply) => {
		try {
			const payload = await authJwt(request);
			if (!payload) {
				console.error('❌ jwt expired');
				return reply.code(401).send({ message: 'failed accessing payload' });
			}

			const { result } = request.body;
			if (result !== 'win' && result !== 'lose')
				return reply.code(400).send({ message: 'invalid param' });
			console.log(result);
			await userManagement.updateStat(payload.id, result === 'win');
			reply.send({ success: true });
		}
		catch (err) {
			console.error('❌ error during recording stat', err);
			reply.code(500).send({ message: 'stat recording fail' });
		}
	})
}

module.exports = recordStat;
