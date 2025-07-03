const db = require('./init');

async function findUserByEmail(email) {
	return new Promise((resolve, reject) => {
		db.get('SELECT * FROM users WHERE email = ?', 
			[email], 
			(err, row) => {
			if (err)
				return reject(err);
			resolve(row);
		});
	});
}

async function createUser({ email, password_hash = null, name = null , google_id = null }) {
	return new Promise((resolve, reject) => {
		db.run(
			'INSERT INTO users (email, password_hash, name, google_id) VALUES (?, ?, ?, ?)',
			[email, password_hash, name, google_id],
			function (err) {
				if (err)
					return reject(err);
				resolve({ id: this.lastID });
			}
		);
	});
}

async function updatePassword(userId, hashedNewPassword) {
	return new Promise((resolve, reject) => {
		db.run(
			`UPDATE users SET password_hash = ? WHERE id = ?`,
			[hashedNewPassword, userId],
			(err) => {
				if (err)
					return reject(err);
				resolve();
			}
		);
	});
}

async function updateName(userId, userName) {
	return new Promise((resolve, reject) => {
		db.run(
			`UPDATE users SET name = ? WHERE id = ?`,
			[userName, userId],
			(err) => {
				if (err)
					return reject(err);
				resolve();
			}
		);
	});
}

async function findUserById(userId) {
	return new Promise((resolve, reject) => {
		db.get('SELECT * FROM users WHERE id = ?', 
			[userId], 
			(err, row) => {
			if (err)
				return reject(err);
			resolve(row);
		});
	});
}

async function getUsers() {
	return new Promise((resolve, reject) => {
		db.all(
			'SELECT id, email, name, created_at FROM users',
			(err, rows) => {
				if (err)
					reject(err);
				resolve(rows);
			}
		);
	});
}

async function deleteAccount(userId) {
	return new Promise((resolve, reject) => {
		db.run(
			`DELETE FROM users WHERE id = ?`,
			[userId],
			(err) => {
				if (err)
					reject(err);
				resolve();
			}
		);
	});
}

async function updateStat(userId, win) {
	return new Promise((resolve, reject) => {
		db.run(
			`UPDATE users SET ${win ? 'win = win + 1' : 'lose = lose + 1'} WHERE id = ?`,
			[userId],
			(err) => {
				if (err)
					reject(err);
				resolve();
			}
		);
	});
}

module.exports = {
	findUserByEmail,
	createUser,
	updatePassword,
	updateName,
	findUserById,
	getUsers,
	deleteAccount,
	updateStat,
}	;
