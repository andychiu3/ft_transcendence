const authJwt = require('../middleware/jwtAuthenticator');
const path = require('path');
const fs = require('fs/promises');

async function processAndSaveAvatar(data, userId) {
	const uploadPath = path.join(process.cwd(), 'avatar', 'upload', `${userId}.png`);
	const uploadDir = path.dirname(uploadPath);
	await fs.mkdir(uploadDir, { recursive: true });

	const buffer = await data.toBuffer(); // multipart
	await fs.writeFile(uploadPath, buffer);
}

async function avatar(fastify) {
	// console.log('-> /api/avatar');
	fastify.post('/api/avatar', async (request, reply) => {
		try {
			const data = await request.file(); // multipart
			if (!data) {
				console.error('❌ got no file');
				return reply.code(400).send({ message: 'got no file'});
			}

			if (data.file.bytesRead > 5 * 1024 * 1024)  {
				console.error('❌ file > 5MB'); // tho its being set to accept 6MB
				return reply.code(400).send({ message: 'file > 5MB'});
			}
			
			const allowedMimeTypes = ['image/jpeg', 'image/png'];
			if (!allowedMimeTypes.includes(data.mimetype)) {
				console.error('❌ accept .jpg and .png only');
				return reply.code(400).send({ message: 'accept jpg and png only'});
			}

			const payload = await authJwt(request);
			if (!payload) {
				console.error('❌ jwt expired?');
				return reply.code(401).send({ message: 'jwt verification failed'});
			}
			
			await processAndSaveAvatar(data, payload.id);
			reply.send({ success: true });
		}
		catch (err) {
			console.error('❌ catch err: ', err);
			reply.code(500).send({ error: 'upload failed' });
		}
	});
}

module.exports = avatar;
