// commonjs
const	sqlite3 = require('sqlite3').verbose();
const	db = new sqlite3.Database('users.db');

// db.cmd(sql, [params], [callback]);
db.serialize(() => {
	db.run(`
		CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT, 
		email TEXT UNIQUE,
		password_hash TEXT, 
		google_id TEXT UNIQUE,
		name TEXT,
		win INTEGER DEFAULT 0,
		lose INTEGER DEFAULT 0,
		auth_app_secret TEXT,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
		`);
	
	db.run(`
		CREATE TABLE IF NOT EXISTS matches (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user1 TEXT NOT NULL,
		user2 TEXT NOT NULL,
		winner TEXT NOT NULL,
		round INTEGER NOT NULL,
		played_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`);
});

module.exports = db;
