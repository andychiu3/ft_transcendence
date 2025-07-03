export function renderPongPage(): string {
	return `
		<div class="flex flex-col items-center justify-center min-h-screen bg-black">
			<h1 id="match-title" class="text-white text-4xl mb-4"></h1>
			<div id="user-names"class="mb-4 text-white">
				<span id="player1Name" class="text-5xl mr-10">Player 1</span>
				<span id="player2Name" class="text-5xl">Player 2</span>
			</div>
			<div class="mb-4 text-white">
				<span id="player1Score" class="text-5xl mr-10">0</span>
				<span id="player2Score" class="text-5xl">0</span>
			</div>
			<canvas id="pongCanvas" width="800" height="400" class="border border-white"></canvas>
			<p id="powerupInfo" class="text-white text-center"></p>
			<div id="startInfo" class="mt-4 text-white text-center gap-2 flex flex-col">
				<button id="startButton" class="px-4 py-2 bg-white text-black rounded">Start</button>
				<p>Player 1: W & S for movement</p>
				<p>Player 2: Arrow Up & Arrow Down for movement</p>
				<p>Hitting the red powerup boxes can give various effects</p>
				<p id="winAmountInfoText">First to 5 points wins</p>
				<hr class="border-white">
				<h1 class="text-white text-2xl"> Customisation </h1>
				<div id="customisation" class="flex flex-col justify-center gap-y-2">
					<div class="flex flex-row justify-center gap-x-8">
						<p> Powerups enabled? </p>
						<input type="checkbox" id="powerupsEnabled" checked>
					</div>
					<div class="flex flex-row justify-center gap-x-8">
						<p> Player 2 AI enabled? </p>
						<input type="checkbox" id="aiEnabled">
					</div>
					<div class="flex flex-row justify-center gap-x-8">
						<p id="speedText"> Ball Speed: (100%) </p>
						<input type="range" id="ballSpeed" min="50" max="150" value="100">
					</div>
					<div class="flex flex-row justify-center gap-x-8">
						<p id="winAmountText"> Winning Score: (5) </p>
						<input type="range" id="winAmount" min="1" max="10" value="5">
					</div>
					<div class="flex flex-row justify-center gap-x-6">
						<p> Paddle 1 Color: </p>
						<p> Paddle 2 Color: </p>
					</div>
					<div class="flex flex-row justify-center gap-x-20">
						<input type="color" id="paddle1Color" value="#ffffff" class="w-10 h-10">
						<input type="color" id="paddle2Color" value="#ffffff" class="w-10 h-10">
					</div>
				</div>
			</div>
			<div id="winnerInfo" class="mt-4 text-white text-center gap-2 flex flex-col">
			</div>
		</div>
	`;
	}