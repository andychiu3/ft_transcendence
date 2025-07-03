const authJwt = require('../middleware/jwtAuthenticator');
const uerManagement = require('../db/userManagement');

async function	profile(fastify, opts) {
	fastify.get('/api/profile', async (request, reply) => {
		try {
			const payload = await authJwt(request);
			console.log('✅ /api/profile JWT verified and payload gotten.');
			
			// can simplify this one
			const user = await uerManagement.findUserById(payload.id);
			if (!user)
				throw new Error('❌ User not found');
			reply.send({ ok: true, data: user });
		}
		catch (err) {
			console.error('❌ /api/profile JWT verification failed.');
			reply.status(401).send({ error: 'Invalid or expired token' });
		}
	})
}

module.exports = profile;