export const getApiUrl = (api: string) => {
	const isLocalhost = window.location.hostname === 'localhost' || 
						window.location.hostname === '127.0.0.1';
	return isLocalhost ? api : `https://ft-transcendence-rtjp.onrender.com${api}`;
}
