import { getApiUrl } from "./config";

export async function	verifyJwt(): Promise<boolean> {
	try {
		const apiUrl = getApiUrl('/api/auth/verify');
		const result = await fetch(apiUrl, {
			credentials: 'include'
		});
		const data = await result.json();
		return result.ok;
	} 
	catch (err) {
		console.error('JWT verification failed', err);
		return false;
	}
}
