const fp = require('fastify-plugin')

function	cookieEnvSuffix() {
	const isProduction = process.env.NODE_ENV === 'production';
	return isProduction
		? '; SameSite=None; Secure; Partitioned'
		: '; SameSite=Lax';
}

async function	cookieSetter(fastify) {
	fastify.decorateReply('setJwtCookie', function(token) {
		const cookieString = `jwt=${token}; HttpOnly; Path=/; Max-Age=3600${cookieEnvSuffix()}`;
		this.header('Set-Cookie', cookieString);
		return this;
	})

	fastify.decorateReply('clearJwtCookie', function() {
		const cookieString = `jwt=; HttpOnly; Path=/; Max-Age=0${cookieEnvSuffix()}`;
		this.header('Set-Cookie', cookieString);
		return this;
	})
}

module.exports = fp(cookieSetter);
