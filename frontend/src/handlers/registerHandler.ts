import { navigate } from "../app";
import { getApiUrl } from "../utils/config";

export function	registerHandler() {
	const form = document.getElementById('registerForm');
	if (form) {
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			
			const formData = new FormData(form as HTMLFormElement);
			const email = formData.get('email');
			const password = formData.get('password');
			// const backendUrl = import.meta.env.VITE_BACKEND_URL || 'localhost:3000';
			const apiUrl = getApiUrl('/api/register');
			console.log(apiUrl);

			try {
				// console.log(apiUrl);
				const response = await fetch(apiUrl, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password }),
				});

				const result = await response.json();
				if (response.ok) {
					alert('registration succeeded');
					navigate('/login');
				}
				else
					alert('registration failed: ' + result.error);
			}
			catch {
				console.error('registration failed?');
				alert('registration failed?');
			}
		});
	}
}
