import { navigate } from '../app';

var tournamentdata: any = null;

function createTournamentPage() {
	return `
		<h1 class="text-5xl font-bold">Create a tournament</h1>
		<div id="add-user" class="flex flex-row items-center justify-center gap-4">
			<input type="text" id="add-user-input" class="block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300" placeholder="enter alias...">
			<button id="add-user-button" class="block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300">Add user</button>
		</div>
		<h1 class="text-2xl font-bold">Current users</h1>
		<div id="current-users">
		</div>
		<button id="create-tournament-button" class="block p-2 text-gray-800 bg-gray-300 rounded border-2 border-gray-300" disabled>Start tournament</button>
	`;
}

function midTournamentPage() {
	return `
		<button id="end-tournament" class="font-bold block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300">End tournament</button>
		<h1 id="match-title" class="text-5xl font-bold">Match </h1>
		<div id="match-users">
			<p id="match-user1"></p>
			<p id="match-user2"></p>
		</div>
		<button id="match-start" class="block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300">Start match</button>
	`;
}

function updateUserList() {
	const userlist = document.getElementById('current-users')!;

	//add each user to current-users div and add remove event listener
	userlist.innerHTML = '';
	tournamentdata.users.forEach((user: string) => {
		const userbutton = document.createElement('button');
		userbutton.id = user;
		userbutton.innerHTML = user;
		userbutton.classList.add('block', 'p-2', 'text-gray-800', 'bg-gray-200', 'rounded-md', 'border-2', 'border-gray-200', 'hover:bg-red-200');
		//on click remove from users list and update view
		userbutton.addEventListener('click', () => {
			tournamentdata.users = tournamentdata.users.filter((u: string) => u !== user);
			updateUserList();
		});
		userlist.appendChild(userbutton);
	});

	//enable or disable tournament start button depending on amount of users
	const startbutton = document.getElementById('create-tournament-button')! as HTMLButtonElement;
	if (tournamentdata.users.length > 1) {
		startbutton.disabled = false;
		startbutton.classList.remove('bg-gray-300');
		startbutton.classList.add('bg-gray-100');
		startbutton.classList.add('hover:bg-gray-200');
	}
	else {
		startbutton.disabled = true;
		startbutton.classList.remove('bg-gray-100');
		startbutton.classList.remove('hover:bg-gray-200');
		startbutton.classList.add('bg-gray-300');
	}
}

function createMatches() {
	//remove previous matches
	tournamentdata.matches = [];

	//add new matches pairing in order
	for (let i = 0; i < tournamentdata.users.length; i += 2) {
		if (i + 1 < tournamentdata.users.length) {
			tournamentdata.matches.push({
				user1: tournamentdata.users[i],
				user2: tournamentdata.users[i + 1],
				winner: null
			});
		}
		else { //if odd user auto win
			tournamentdata.matches.push({
				user1: tournamentdata.users[i],
				user2: "BYE",
				winner: tournamentdata.users[i]
			});
		}
	}
	localStorage.setItem('tournament', JSON.stringify(tournamentdata));
}

export function tournamentHandler() {
	//get tournament data from local storage
	var tournament = localStorage.getItem('tournament');
	if (tournament) {
		tournamentdata = JSON.parse(tournament);
	}
	else {
		tournamentdata = null;
	}

	//if there is an ongoing tournament
	if (tournamentdata && tournamentdata.started && tournamentdata.matches) {
		//if every match has complete, keep only winners and create new round of matches
		if (tournamentdata.matches.every((match: any) => match.winner !== null)) {
			tournamentdata.users = tournamentdata.matches.map((match: any) => match.winner);
			createMatches();
		}

		//if only one user left (tournament won)
		if (tournamentdata.users.length === 1) {
			alert('tournament done, winner is ' + tournamentdata.users[0]);
			localStorage.removeItem('tournament');
			navigate('/');
		}

		//set page to the mid match / ongoing tournament page
		document.getElementById('tournament-main')!.innerHTML = midTournamentPage();

		//update the page with current match info
		const currentMatch = tournamentdata.matches.find((match: any) => match.winner === null);
		document.getElementById('match-title')!.innerHTML = `Match ${tournamentdata.matchnumber}`;
		document.getElementById('match-user1')!.innerHTML = currentMatch.user1;
		document.getElementById('match-user2')!.innerHTML = currentMatch.user2;

		//add start button listener
		document.getElementById('match-start')!.addEventListener('click', () => {
			navigate('/play');
		});
		//add end tournament listener
		document.getElementById('end-tournament')!.addEventListener('click', () => {
			alert('tournament ended early');
			localStorage.removeItem('tournament');
			navigate('/');
		});
	}
	//if there is no ongoing tournament
	else {
		//add base tournament struct to local storage
		tournamentdata = {
			users: [],
			matches: [],
			matchnumber: 1,
			started: false
		};
		localStorage.setItem('tournament', JSON.stringify(tournamentdata));

		//set page to the create tournament page
		document.getElementById('tournament-main')!.innerHTML = createTournamentPage();

		//set add user listener
		document.getElementById('add-user-button')!.addEventListener('click', () => {
			const input = document.getElementById('add-user-input') as HTMLInputElement;
			const alias = input.value;
			if (alias && !tournamentdata.users.includes(alias)) { //add better input sanitation later
				tournamentdata.users.push(alias);
				input.value = '';
				updateUserList();
			}
		});
		//set start button listener
		document.getElementById('create-tournament-button')!.addEventListener('click', () => {
			tournamentdata.started = true;
			createMatches();
			navigate('/tournament'); //rerun the page now tournament data is set
		});
	}
}
