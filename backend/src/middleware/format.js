function	isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function	isValidPassword(password) {
	return password.length >= 8 &&
		/[A-Z]/.test(password) &&
		/[a-z]/.test(password) &&
		/[0-9]/.test(password);
}

module.exports = {
	isValidEmail,
	isValidPassword,
}	;
