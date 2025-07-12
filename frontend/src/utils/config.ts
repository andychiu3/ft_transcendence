export function getApiUrl(api: string) {
	const isLocalhost = window.location.hostname === 'localhost' || 
						window.location.hostname === '127.0.0.1';
	return isLocalhost ? api : `https://ft-transcendence-rtjp.onrender.com${api}`;
}

export function	getWebSocketUrl() {
	const isLocalhost = window.location.hostname === 'localhost' || 
						window.location.hostname === '127.0.0.1';
	if (isLocalhost)
		return `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws`;
	else
		return 'wss://websocket-o3f2.onrender.com/ws'
}
