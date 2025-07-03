const matchManagement = require('../db/matchManagement');

async function matchResult(fastify) {
	fastify.post('/api/match-result', async (request, reply) => {
		try {
			const tournamentData = request.body;
			// console.log(tournamentData);
			await matchManagement.createMatch(tournamentData);
			reply.send({ message: 'success' });
		}
		catch (err) {
			console.error('catch err: fail to create match' + err);
			reply.code(500).send({ error: 'failed to create match' });
		}
	});	
}

module.exports = matchResult;
