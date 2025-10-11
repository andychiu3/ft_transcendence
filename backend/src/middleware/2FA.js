const nodemailer = require('nodemailer');
const userManagement = require('../db/userManagement');
const { totp } = require('otplib');

// sender tho BLOCKED by firewall of Render
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.SENDER_EMAIL,
		pass: process.env.SENDER_PW,
	},
});

function	generateCode() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

async function send2FACode(email, code) {
	await transporter.sendMail({
		from: process.env.SENDER_EMAIL,
		to: email,
		subject: 'Your 2FA Verification Code',
		text: `Your 2FA code is ${code}`,
	});
}

const	twoFACode = {};

// redis or SQLite??
function	save2FACode(email, code) {
	console.log('save2FACode', email, code);
	twoFACode[email] = {
		code,
		expiresAt: Date.now() + 5 * 60 * 1000
	};
}

// with both TOTP and email
async function	verify2FACode(email, inputCode, method) {
	const user = await userManagement.findUserByEmail(email);
	if (!user)
		return false;
	if (method === 'authApp') {
		if (user.auth_app_secret) {
			const isValid = await totp.verify({ token: inputCode, secret: user.auth_app_secret });
			console.log('TOTP verification', inputCode, isValid);
			return isValid;
		}
	}
	else if (method === 'email') {
		const entry = twoFACode[email];
		console.log('email 2FA verification', inputCode, entry);
		if (!entry)
			return false;
		if (Date.now() > entry.expiresAt)
			return false;
		return entry.code === inputCode;
	}
	return false; // in case I didn't think of anything
}

module.exports = { 
	generateCode,
	send2FACode,
	save2FACode,
	verify2FACode,
}	;
