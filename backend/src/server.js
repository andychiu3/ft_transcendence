require('dotenv').config();
const path = require('path');
const fastify = require('fastify') ({ 
	// logger: true
	logger: { level: 'error' } 
});

// plugin
fastify.decorate('db', require('./db/init'));
// console.log('__dirname: ', path.join(__dirname, '../avatar'));
fastify.register(require('@fastify/static'), {
	root: path.join(__dirname, '../avatar'),
	prefix: '/avatar/', // GET start with /avatar will look for the root
});
fastify.register(require('@fastify/cors'), {
	origin: ['http://localhost:5173', 'https://localhost', 'https://42-transcendence-achiu.vercel.app'],
	method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
}); // does not seem to be needed if vite is set
fastify.register(require('@fastify/multipart'), {
	limits: {
		fileSize: 6 * 1024 * 1024,
		files: 1,
	}
});

// routes
fastify.register(require('./routes/login'));
fastify.register(require('./routes/logout'));
fastify.register(require('./routes/register'));
fastify.register(require('./routes/remoteSignIn')); // google sign in
fastify.register(require('./routes/auth'));
fastify.register(require('./routes/profile'));
fastify.register(require('./routes/password'));
fastify.register(require('./routes/name'));
fastify.register(require('./routes/avatar'));
fastify.register(require('./routes/matchResult'));
fastify.register(require('./routes/matchHistory'));
fastify.register(require('./routes/users'));
fastify.register(require('./routes/account'));
fastify.register(require('./routes/statVersusAI'));
// 2FA codes
fastify.register(require('./routes/checkAuthAppSecret')); // google authenticator secret
fastify.register(require('./routes/2FAcode'));

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
	if (err)
		throw err;
	console.log('Server is running.');
});

// for route checking
fastify.addHook('onRequest', (request, reply, done) => {
  console.log('-> ', request.method, request.url);
  done();
});
