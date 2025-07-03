async function logout(fastify, opts) {
	fastify.post('/api/logout', async (request, reply) => {
		//remove jwt from cookies
		reply.header('Set-Cookie', 
			`jwt=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`);
		reply.send({ success: true });
	});
}

module.exports = logout;