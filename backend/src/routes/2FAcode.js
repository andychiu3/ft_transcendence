const twoFA = require('../middleware/2FA');

async function send2FACode(fastify) {
	fastify.post('/api/send2FACode', async (request, reply) => {
		const { email } = request.body;
		const code = twoFA.generateCode();

		try {
			await twoFA.send2FACode(email, code);
			twoFA.save2FACode(email, code);
			console.log('✅ 2fa sent and saved.');
			reply.code(200).send({ ok: true });
		}
		catch (err) {
			console.error('❌ Mail error: ', err);
			reply.code(500).send({ error: 'Failed to send mail' });
		}
	});
}

module.exports = send2FACode;
