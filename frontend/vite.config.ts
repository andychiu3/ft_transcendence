import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		allowedHosts: [
		'*.42.fr',
	  ],
	  proxy: {
		'/api': {
		  target: 'http://backend:3000',
		  changeOrigin: true,
		  secure: false,
		},
		'/avatar': {
		target: 'http://backend:3000',
		changeOrigin: true,
		secure: false,
		},
		'/ws': {
			target: 'http://ws:3001',
			ws: true,
			changeOrigin: true,
			secure: false,
		},
	},
	  watch: {
		usePolling: true,
		interval: 1000,
	  },
	},
});
