import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [ react() ],
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
