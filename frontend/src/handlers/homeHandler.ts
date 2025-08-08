import { verifyJwt } from '../utils/verifyJwt';
import { navigate } from '../app';
import { renderProfile } from '../pages/profile';
import { renderMatchHistory } from '../pages/matchHistory';
import { logoutHandler } from "./logoutHandler";
import { renderUsers } from '../pages/users';
import { connectWebSocket } from '../utils/userWebSocket';
import { getApiUrl } from '../utils/config';

async function	loadProfile(): Promise<void> {
	try {
		const apiUrl = getApiUrl('/api/profile')
		const response = await fetch(apiUrl, {
			credentials: 'include',
		});
		const { ok, data } = await response.json();

		if (response.ok)
			renderProfile(data);
		else {
			alert(String(data.error));
			navigate('/login');
		}
	} 
	catch (err) {
		alert('Pass may have expired. Please login again');
		navigate('/login');
	}
}

async function loadMatchHistory(): Promise<void> {
	try {
		const apiUrl = getApiUrl('/api/match/history')
		const response = await fetch(apiUrl, {
			credentials: 'include',
		});
		if (response.ok) {
			const data = await response.json();
			renderMatchHistory(data);
		}
		else {
			alert('Pass may have expired. Please login again');
			navigate('/login');
		}
	}
	catch (err) {
		alert('Pass may have expired. Please login again?');
		navigate('/login');
	}
}

async function loadUsers(): Promise<void> {
	try {
		const apiUrl = getApiUrl('/api/users');
		const response = await fetch(apiUrl, {
			credentials: 'include',
		});
		if (response.ok) {
			const data = await response.json();
			renderUsers(data);
		}
		else {
			alert('Pass may have expired. Please login again');
			navigate('/login');
		}
	}
	catch (err) {
		alert('Pass may have expired. Please login again?');
		navigate('/login');
	}
}

// may try map next time
const tabHandler: Record<string, () => Promise<void>> = {
	'profile': loadProfile,
	'matchHistory': loadMatchHistory,
	'users': loadUsers,
};

export async function	homeHandler(): Promise<void> {
	const isloggedin = await verifyJwt();
	if (!isloggedin) {
		document.getElementById('Render-case')?.classList.add('hidden');
		document.querySelector('#login-logout a[data-link]')!.classList.remove('hidden');
		document.getElementById('main-content')?.classList.remove('ml-64');
	}
	else {
		connectWebSocket();

		document.getElementById('sidebar')?.classList.remove('hidden');
		document.getElementById('main-content')?.classList.add('ml-64');
		document.getElementById('logout-button')!.addEventListener('click', logoutHandler);

		document.querySelectorAll('[data-tab]').forEach((element) => {
			element.addEventListener('click', async (event) => {
				event.preventDefault();

				const tab = element.getAttribute('data-tab');
				if (tab && tabHandler[tab])
					await tabHandler[tab]();
			});
		});
	}
}

// fixing hard refresh -> relink -> don't add data-link dynamically -> event delegate
// document.getElementById('login-logout')!.innerHTML += `
// 	<a href="/login" class="block p-2 text-white bg-blue-500 hover:bg-blue-600 rounded w-20 text-center" data-link> Login </a>
// `;
// import('../app').then((m) => { m.attachLinks(); });

// function	connectWebSocket() {
// 	const ws = new WebSocket('/ws');
// 	ws.onopen = () => console.log('ws connected');
// 	ws.onmessage = (event) => console.log('connectWebSocket: ', event.data);
// 	ws.onclose = () => console.log('ws closed');
// 	ws.onerror = (error) => console.log('websocket error: ', error);
// }