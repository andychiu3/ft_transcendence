export function	renderHomePage(): string {
	return `
				<!-- Sidebar -->
				<nav id="sidebar" class="w-64 bg-white p-10 flex flex-col h-screen">
					<ul id="menu" class="space-y-2 flex flex-col flex-1">
						<li class="block font-bold underline p-2 text-gray-800 rounded text-center"> Menu </li>
						<li> <a href="#" class="block p-2 text-gray-800 hover:bg-gray-200 rounded text-center" data-tab="profile"> Profile </a> </li>
						<li> <a href="#" class="block p-2 text-gray-800 hover:bg-gray-200 rounded text-center" data-tab="users"> users </a> </li>
						<li> <a href="#" class="block p-2 text-gray-800 hover:bg-gray-200 rounded text-center" data-tab="matchHistory"> Match History </a> </li>
						<li> <a href="/play" class="block p-2 text-gray-800 hover:bg-gray-200 rounded text-center" data-link> Play Pong </a> </li>
						<li> <a href="/tournament" class="block p-2 text-gray-800 hover:bg-gray-200 rounded text-center" data-link> Tournament </a> </li>
						<li class="flex-1"> </li>
						<li class="mt-auto">
							<button id="logout-button" class="w-full p-2 text-gray-800 hover:bg-gray-200 rounded text-center"> Logout </button>
						</li>
					</ul>
				</nav>

				<!-- Main Content -->
				<main id="main-content" class="flex flex-1 justify-center items-center text-gray-800">
					<div class="flex items-center space-x-4">
						<a href="/play" class="block py-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300 w-32 text-center" data-link> Play Pong </a>
						<a href="/tournament" class="block py-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300 w-32 text-center" data-link> Tournament </a>
					</div>
					<div id="login-logout" class="absolute top-5 right-5">
						<a href="/login" class="block p-2 text-white bg-blue-500 hover:bg-blue-600 rounded w-20 text-center hidden" data-link> Login </a>
					</div>
				</main>
	`;
}
