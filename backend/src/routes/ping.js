async function pingRoute(fastify, opts) {
  fastify.get('/ping', async(request, reply) => {
    try {
      // TODO: ping the database to check if it's alive after switching to a new database connection pool
      console.log('✅ got ping.');
      reply.send({ message: 'pong' });
    } catch (error) {
      console.error('❌ Error in /ping route:', error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  })
}

module.exports = pingRoute;