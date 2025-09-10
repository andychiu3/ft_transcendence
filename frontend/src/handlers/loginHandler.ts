import { verifyJwt } from '../utils/verifyJwt';
import { getApiUrl } from '../utils/config';

async function	send2FA(formData: FormData) {
	const email = formData.get('email') as string;
	if (!email) {
		alert('enter email to get the code');
		return ;
	}

	try {
		const apiUrl = getApiUrl('/api/send2FACode');
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({ email }),
			credentials: 'include',
		});
		const result = response.json();
		if (response.ok)
			alert('code has been sent.');
		else
			alert('fail to send');
	}
	catch {
		alert('got info which is not json?');
	}
}

function	popQrCode(secretUrl: string) {
	const modal = document.getElementById('qrModal');
	const qrImg = document.getElementById('qrImage') as HTMLImageElement;
	const closeModalBtn = document.getElementById('closeModalBtn');

	if (modal && qrImg) {
		qrImg.src = secretUrl;
		modal.classList.remove('hidden');
		if (closeModalBtn) {
			closeModalBtn.onclick = () => {
				modal.classList.add('hidden');
			}
		}
	}
}


async function authAppSecretHandler(formData: FormData) {
	const email = formData.get('email') as string;
	if (!email) {
		alert('Enter email for auth app check');
		return ;
	}
	try {
		const apiUrl = getApiUrl('/api/authAppSecretCheck');
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
			credentials: 'include',
		});
		if (!response.ok) {
			alert('please register first.');
			return ;
		}
		const result = await response.json();

		if (result.qrCodeDataUrl)
			popQrCode(result.qrCodeDataUrl);
		else
			alert('unexpected case?');
	}
	catch {
		alert('catched err');
	}
}

function	setupSendCodeButton() {
	const sendCodeBtn = document.getElementById('sendCodeBtn');
	const loginForm = document.getElementById('loginForm') as HTMLFormElement;
	if (sendCodeBtn) {
		sendCodeBtn.addEventListener('click', async () => {
			const formData = new FormData(loginForm);
			const method = formData.get('method');
			if (method === 'email')
				await send2FA(formData);
			else if (method === 'authApp')
				await authAppSecretHandler(formData);
		});
	}
}

async function setupLoginForm() {
	const loginForm = document.getElementById('loginForm') as HTMLFormElement;
	loginForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const formData = new FormData(loginForm);
		const email = formData.get('email');
		const password = formData.get('password');
		const authCode = formData.get('code');
		const method = formData.get('method');
		// console.log("Form data:", { email, password, authCode });
		try {
			const apiUrl = getApiUrl('/api/login');
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password, authCode, method }),
				credentials: 'include',
			});

			const result = await response.json();
			if (response.ok) {
				alert('login succeeded');
				import('../app').then((m) => m.navigate('/home'));
			}
			else
				alert('login failed: ' + String(result.error));
		}
		catch (err) {
			alert('login failed?');
		}
	});
}

async function showTerms() {
	document.getElementById('showTermsBtn')?.addEventListener('click', (event) => {
		event.preventDefault();
		document.getElementById('terms')?.classList.toggle('hidden');
	});
}

export async function loginHandler() {
	const isValid = await verifyJwt();
	if (isValid) {
		alert('The API is hosted on Render’s free tier, which may introduce cold start latency of up to 3 minutes.')
		import('../app').then((m) => m.navigate('/home')); // combine import {} from xx -> navigate('/home');
		return ;
	}

	setupSendCodeButton();
	setupLoginForm();
	showTerms();
}

// get ?name=andy&school=42 of example.com?name=andy&school=42
	// const urlParams = new URLSearchParams(window.location.search);
	// const token = urlParams.get('token');
