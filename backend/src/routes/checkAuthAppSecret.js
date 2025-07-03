const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

function	generateSaveAuthAppSecret(db, email) {
	return new Promise((resolve, reject) => {
		const secret = speakeasy.generateSecret({ name: `Transcendence (${email})`});
		db.run(
			`UPDATE users SET auth_app_secret = ? WHERE email = ?`,
			[secret.base32, email],
			(err) => {
				if (err) {
					console.error('❌ DB error during secret update');
					return reject(err);
				}
				qrcode.toDataURL(secret.otpauth_url, (qrErr, dataUrl) => {
					if (qrErr) {
						console.error('❌ QRcode generation error');
						return reject(err);
					}
					resolve(dataUrl);
				});
			}
		);
		})
	
}

function	getUserSecretByEmail(db, email) {
	return new Promise((resolve, reject) => {
		db.get(
			`SELECT auth_app_secret FROM users WHERE email = ?`,
			[email],
			(err, row) => {
				if (err)
					return reject(err);
				resolve(row);
			}
		);
	});
}

function	saveUserSecret(db, email, secret) {
	return new Promise((resolve, reject) => {
		db.run(
			`UPDATE users SET auth_app_secret = ? WHERE email = ?`,
			[secret, email],
			(err, row) => {
				if (err)
					reject(err);
				resolve();
			}
		);
	});
}

function	generateQRcode(secret, email) {
	const otpauth_url = speakeasy.otpauthURL({
		secret,
		label: `Transcendence (${email})`,
		issuer: `Transcendence`
	});
	return new Promise((resolve, reject) => {
		qrcode.toDataURL(otpauth_url, (err, dataUrl) => {
			if (err)
				return reject(err);
			resolve(dataUrl);
		})
	})
}

async function	checkAuthAppSecret(fastify) {
	fastify.post('/api/authAppSecretCheck', async (request, reply) => {
		const { email } = request.body;
		if (!email)
			return reply.code(400).send({ error: 'Email required' });

		try {
			const row = await getUserSecretByEmail(fastify.db, email);
			if (!row) {
				console.error('❌ user not found')
				return reply.code(404).send({ error: 'user not found' });
			}

			let secret = row.auth_app_secret;
			if (!secret) {
				const newSecret = speakeasy.generateSecret({ length: 20});
				secret = newSecret.base32;
				await saveUserSecret(fastify.db, email, secret);
			}
			// console.log(secret);
			const qrCodeDataUrl = await generateQRcode(secret, email);
			// console.log(qrCodeDataUrl);
			return reply.send({ hasSecret: true, qrCodeDataUrl });
		}
		catch (err) {
			console.error('❌ api catch err')
			return reply.code(500).send({ error: 'api catch err' });
		}
	})
}

module.exports = checkAuthAppSecret;
