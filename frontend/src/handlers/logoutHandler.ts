import { navigate } from '../app';
import { disconnectWebSocket } from '../utils/userWebSocket';
import { getApiUrl } from '../utils/config';

export async function logoutHandler() {
	try {
		const apiUrl = getApiUrl('/api/logout');
		const response = await fetch(apiUrl, {
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
