const db = require('./init');

async function createMatch(tournamentData) {
	// const completedMatch = tournamentData.matches[tournamentData.matchnumber - 2];
	return new Promise((resolve, reject) => {
		db.run(
			'INSERT INTO matches (user1, user2, winner, round) VALUES (?, ?, ?, ?)',
			[
				tournamentData.matches[0].user1, 
				tournamentData.matches[0].user2, 
				tournamentData.matches[0].winner, 
				tournamentData.matchnumber - 1
			],
			function (err) {
				if (err)
					return reject(err);
				resolve();
			}
		);
	});
}

async function getMatchHistory() {
	return new Promise((resolve, reject) => {
		db.all(
			'SELECT * FROM matches ORDER BY played_at DESC',
			(err, rows) => {
				if (err)
					return reject(err);
				resolve(rows);
			}
		);
	});
}

module.exports = {
	createMatch,
	getMatchHistory,
};
