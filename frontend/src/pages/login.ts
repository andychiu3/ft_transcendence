import { getApiUrl } from "../utils/config";

export function renderLoginPage(): string {
	const oAuthUrl = getApiUrl('/api/auth/google');
	return `
	<div class="flex flex-col items-center justify-center min-h-screen w-full">
		<div class="bg-white p-6 rounded-xl shadow-md w-80 text-left">
			<h2 class="text-2xl font-bold mb-4 text-center"> Login </h2>

			<form id="loginForm" class="space-y-4 mb-4">

				<div class="space-y-4">
					<label class="block text-sm font-medium"> Email: </label>
					<input id="email" name="email" type="email" class="border w-full p-2 mb-4 rounded" required/>
				</div>

				<div class="space-y-4">
					<label class="block text-sm font-medium"> Password: </label>
					<input id="password" name= "password" type="password" class="border w-full p-2 mb-4 rounded" required/>
				</div>
				
				<div class="flex items-center text-sm ml-2">
					<label class="w-20"> 2FA Code: </label>
					<input type="text" name="code" class="border rounded w-20 h-8 ml-1 text-center placeholder-gray-200" placeholder="6 digits" required />
					<button type="button" id="sendCodeBtn" class="text-xs p-1 bg-blue-500 hover:bg-blue-600 text-white h-8 rounded w-20 ml-4">
						Send Code
					</button>
				</div>

				<div class="flex justify-center">
					<label class="text-sm"> send/verify via: </label>
					<label class="text-sm ml-2"><input type="radio" name="method" value="email" checked /> Email </label>
					<label class="text-sm ml-2"><input type="radio" name="method" value="authApp" checked /> AuthApp </label>
				</div>

				<div class="mt-4">
					<button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full mb-2"> Login </button>
				</div>

			</form>

			<div class="flex flex-col space-y-2">
				<a href="/register" data-link class="text-sm text-gray-600 underline text-center"> Register </a>
				<a href="${oAuthUrl}" class="flex w-full items-center justify-center text-sm text-gray-600 underline">
					<img src="https://www.google.com/favicon.ico" alt="Google" class="w-4 h-4 mr-2" />
					Sign in with Google
				</a>
			</div>

       		<p class="text-xs mt-4 text-gray-400 text-center">
				By continuing, you agree to our <a href="#" id="showTermsBtn" class="underline"> terms </a>
			</p>

		</div>

		<div id="terms" class="text-xs text-gray-600 mt-2 hidden space-y-1">
			<h2 class="font-bold text-center"> Terms and Conditions(GDPR compilance) </h2>
			<p> This project: Transcendence uses data solely to provide web functionality </p>
			<p> Data collection:
			<p> - Registration: email and password(hashed before storage)</p>
			<p> - Google sign-in: email, google id and name </p>
			<p> Legal Basis: Necessary for providing account functionality </p>
			<p> Data Storage: All data is stored locally on your own device. </p>
			<p> Data Retention: Until account deletion </p>
			<p> Your Rights: Access, modify and delete your data </p>
			<p> Contact: 42ADL </p>
			<p> Complaints: You may lodge complaints with your local data protection authority </p>
		</div>
	</div>
		<div id="qrModal" class="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-end justify-end hidden z-50>
			<div class="bg-white p-6 rounded-xl shadow-xl w-80 text-center relative">
				<h2 class="text-sm mb-4"> Scan this QR code to register google auth secret </h2>
				<img id="qrImage" src="" alt="QR Code" class="mb-4 w-40 h-40" />
				<button id="closeModalBtn" class="px-4 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"> Close </button>
			</div>
		</div>
		`;
}

// <button id="registerBtn" class="text-sm text-gray-600 underline mb-2">Register</button>
// <button id="googleBtn" class="flex w-full items-center justify-center text-sm text-gray-600 underline mb-2">
// 		<img src="https://www.google.com/favicon.ico" alt="Google" class="w-4 h-4 mr-2" />
// 		Sign in with Google
// </button>