import { navigate } from '../app';
import { disconnectWebSocket } from '../utils/userWebSocket';

export async function logoutHandler() {
	try {
		const response = await fetch('/api/logout', {
			method: 'POST',
			credentials: 'include'
		});
		if (response.ok) {
			disconnectWebSocket();
			navigate('/login');
		}
		else {
			alert('logout failed');
		}
	} catch (error) {
		alert('logout failed');
	}
}
