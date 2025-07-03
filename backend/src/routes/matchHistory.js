const authJwt = require('../middleware/jwtAuthenticator');
const matchManagement = require('../db/matchManagement');

async function matchHistory(fastify) {
	fastify.get('/api/match/history', async (request, reply) => {
		try {
			await authJwt(request);
			const matches = await matchManagement.getMatchHistory();
			reply.send(matches);
		}
		catch (err) {
			console.error('❌ match history err: ', err);
			reply.code(500).send({ error: 'failed to load match history'});
		}
	});
}

module.exports = matchHistory;
