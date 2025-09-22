async function logout(fastify, opts) {
	fastify.post('/api/logout', async (request, reply) => {
		//remove jwt from cookies
		// const isLocalhost = request.headers.origin?.includes('localhost');
		// reply.header('Set-Cookie', 
		// 	`jwt=; HttpOnly; Path=/; SameSite=${isLocalhost ? 'Lax' : 'None'}; Max-Age=3600${isLocalhost? '' : '; Secure'}`);
		reply.clearJwtCookie().send({ success: true });
	});
}

module.exports = logout;
