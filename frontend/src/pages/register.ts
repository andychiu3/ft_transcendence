export function	renderRegisterPage(): string {
	return `
		<div class="min-h-screen w-full flex items-center justify-center">
			<div class="bg-white p-6 rounded-xl shadow-sm w-80 space-y-4">
				<h2 class="text-2xl font-bold mb-4 text-center"> Register </h2>
				<form id="registerForm" class="space-y-6">
					<div class="space-y-4">
						<label for="email" class="block text-sm font-medium"> Email: </label>
						<input type="email" id="email" name="email" class="w-full p-2 border border-gray-300 rounded" required/>
					</div>
					<div class="space-y-4">
						<label for="password" class="block text-sm font-medium"> Password: </label>
						<input type="password" id="password" name="password" class="w-full p-2 border border-gray-300 rounded" required/>
					</div>
					<button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
						Register
					</button>
				</form>
				<p class="text-sm text-center mt-4">
					Already have an account? <a href="/login" class="text-blue-500 underline" data-link>Login</a>
				</p>
			</div>
		</div>
	`;
}
