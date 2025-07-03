const authJwt = require('../middleware/jwtAuthenticator');

async function	auth(fastify, opts) {
	fastify.get('/api/auth/verify', async (request, reply) => {
		try {
			console.log('requested from: ', request.headers['x-from'] || 'frontend');
			await authJwt(request);
			console.log('✅ /api/auth/verify JWT verified.');
			reply.send({ ok: true });
		}
		catch (err) {
			console.error('❌ /api/auth/verify JWT verification failed.');
			reply.status(401).send({ error: 'Invalid or expired token' });
		}
	});
}

module.exports = auth;
