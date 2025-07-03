export async function	verifyJwt(): Promise<boolean> {
	try {
		const result = await fetch('/api/auth/verify', {
			// headers: { Authorization: `Bearer ${token}` },
			credentials: 'include'
		});
		const data = await result.json();
		return result.ok;
	} catch (err) {
		console.error('JWT verification failed', err);
		return false;
	}
}
