const authJwt = require('../middleware/jwtAuthenticator');
const userManagement = require('../db/userManagement');
const bcrypt = require('bcrypt');
const { isValidPassword } = require('../middleware/format');

async function	changePassword(fastify, opts) {
	// console.log('-> /api/profile/password');
	fastify.patch('/api/profile/password', async (request, reply) => {
		try {
			const payload = await authJwt(request);
			console.log('payload without frontend credential inlcude', payload);
			const { oldPassword, newPassword } = request.body;

			console.log('email: ', payload.email);
			const user = await userManagement.findUserByEmail(payload.email);
			if (!user) {
				console.error('❌ user not matched tho does not make sense.');
				return reply.code(401).send({ message: 'user not found why??' });
			}

			const match = await bcrypt.compare(oldPassword, user.password_hash);
			if (!match) {
				console.error('❌ password not matched.');
				return reply.code(401).send({ message: 'password not matched.' });
			}

			if (!isValidPassword(newPassword))
				return reply.code(401).send({ message: 'password needs at least 8 characters with upper/lower cases and number' });

			const hashedNewPassword = await bcrypt.hash(newPassword, 10); // saltround = 10
			await userManagement.updatePassword(user.id, hashedNewPassword);
			reply.send({ success: true });	
		}
		catch (err) {
			console.error('❌ error during password change:', err);
			return reply.code(500).send({ message: 'error during password change'});
		}
	});
}

module.exports = changePassword;
