import { navigate } from "../app";
import { getApiUrl } from "../utils/config";

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
const keys = {
	w: false,
	s: false,
	ArrowUp: false,
	ArrowDown: false,
};

var player1score = 0;
var player2score = 0;
var winamount: number;
var winningplayer = '';
var interval = 0;
var aiinterval = 0;
var powerupsenabled: boolean;
var aienabled: boolean;

var paddle1width: number;
var paddle1height: number;
var paddle1x: number;
var paddle1y: number;
var paddle1color: string;
var paddle1upspeed: number;
var paddle1downspeed: number;

var paddle2width: number;
var paddle2height: number;
var paddle2x: number;
var paddle2y: number;
var paddle2color: string;
var paddle2upspeed: number;
var paddle2downspeed: number;

var ballsize: number;
var ballxspeedInit: number;
var ballxspeed: number;
var ballyspeed: number;
var ballx: number;
var bally: number;

var powerupx: number;
var powerupy: number;
var powerupsize: number;

var tournamentdata: any = null;

function drawElements() {
	//clear canvas
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//draw middle markings
	ctx.strokeStyle = "white";
	ctx.beginPath();
	ctx.setLineDash([5, 15]);
	ctx.moveTo(canvas.width / 2, 5);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.stroke();
	//draw paddles
	ctx.fillStyle = paddle1color;
	ctx.fillRect(paddle1x, paddle1y, paddle1width, paddle1height);
	ctx.fillStyle = paddle2color;
	ctx.fillRect(paddle2x, paddle2y, paddle2width, paddle2height);
	//draw ball
	ctx.fillStyle = "white";
	ctx.fillRect(ballx, bally, ballsize, ballsize);
	//draw powerup
	if (powerupsenabled && powerupx && powerupy) { //hides when coords are 0 (ie its not active)
		ctx.fillStyle = "red";
		ctx.fillRect(powerupx, powerupy, powerupsize, powerupsize);
	}
}

function isInBounds(paddley: number, paddleheight: number, direction: number) {
	if (direction > 0 && paddley < canvas.height - paddleheight) {
		return true;
	}
	else if (direction < 0 && paddley > 0) {
		return true;
	}
	return false;
}

function movePaddles() {
	//left paddle
	if (keys.w && isInBounds(paddle1y, paddle1height, paddle1upspeed)) {
		paddle1y += paddle1upspeed;
	} else if (keys.s && isInBounds(paddle1y, paddle1height, paddle1downspeed)) {
		paddle1y += paddle1downspeed;
	}
	//right paddle
	if (keys.ArrowUp && isInBounds(paddle2y, paddle2height, paddle2upspeed)) {
		paddle2y += paddle2upspeed;
	} else if (keys.ArrowDown && isInBounds(paddle2y, paddle2height, paddle2downspeed)) {
		paddle2y += paddle2downspeed;
	}
}

async function aiMovement() {
	const ballDistance2Paddle = Math.abs(paddle2x - (ballx + ballsize));
	const timeUntilBallReachesPaddle = ballDistance2Paddle / Math.abs(ballxspeed);

	let ballBottomPositionAtHit = (bally + ballsize) + (ballyspeed * timeUntilBallReachesPaddle); //ball's bottom y position when it hits paddle
	let ballTopPositionAtHit = (bally) + (ballyspeed * timeUntilBallReachesPaddle); //ball's top y position when it hits paddle

	//ensure positions dont go out of bounds
	if (ballTopPositionAtHit < 0) {
		ballTopPositionAtHit = 0;
		ballBottomPositionAtHit = ballsize;
	}
	else if (ballBottomPositionAtHit > canvas.height) {
		ballBottomPositionAtHit = canvas.height;
		ballTopPositionAtHit = canvas.height - ballsize;
	}

	//move paddle down or up to hit ball
	if (ballBottomPositionAtHit > (paddle2y + paddle2height)) { //need to move down
		const ballyDistance2Paddle = Math.abs((paddle2y + paddle2height) - ballBottomPositionAtHit);
		const timeToMove = (Math.ceil(ballyDistance2Paddle / Math.abs(paddle2downspeed))) * (1000 / 60);
		//picks keys depending on speed (to work with reversed controls)
		keys[paddle2downspeed > 0 ? "ArrowDown" : "ArrowUp"] = true;
		setTimeout(() => { keys[paddle2downspeed > 0 ? "ArrowDown" : "ArrowUp"] = false; }, timeToMove + 100);
	} else if (ballTopPositionAtHit < paddle2y) { //need to move up
		const ballyDistance2Paddle = Math.abs(paddle2y - ballTopPositionAtHit);
		const timeToMove = (Math.ceil(ballyDistance2Paddle / Math.abs(paddle2upspeed))) * (1000 / 60);
		//picks keys depending on speed (to work with reversed controls)
		keys[paddle2upspeed < 0 ? "ArrowUp" : "ArrowDown"] = true;
		setTimeout(() => { keys[paddle2upspeed < 0 ? "ArrowUp" : "ArrowDown"] = false; }, timeToMove + 100);
	}
}

function calcBallDirection(paddley: number, bally: number, paddleheight: number) {
	const hitpos = (bally + (ballsize / 2)) - paddley;
	const hitrange = (hitpos / paddleheight) - 0.5; //gives range from -0.5 to 0.5
	return hitrange * 5; //*5 for more speed
}

function moveBall() {
	ballx += ballxspeed;
	bally += ballyspeed;

	//check if ball goes out of bounds
	if (ballx < 0) { //ball left edge < canvas left edge
		player2score++;
		if (document.getElementById("player2Score")) {
			document.getElementById("player2Score")!.textContent = player2score.toString();
		}
		resetRound();
	}
	if (ballx+ballsize > canvas.width) { //ball right edge > canvas right edge
		player1score++;
		if (document.getElementById("player1Score")) {
			document.getElementById("player1Score")!.textContent = player1score.toString();
		}
		resetRound();
	}

	//check if ball hits top or bottom
	if (bally < 0 || //ball top edge < canvas top edge
		bally+ballsize > canvas.height) { //ball bottom edge > canvas bottom edge
		ballyspeed = -ballyspeed;
	}

	//check if ball hits left paddle
	if (ballx < (paddle1x + paddle1width) && //ball left edge < paddle right edge
		ballx+ballsize > paddle1x && //ball right edge > paddle left edge
		bally+ballsize > paddle1y &&  //ball bottom edge > paddle top edge
		bally < paddle1y + paddle1height) { //ball top edge < paddle bottom edge
		ballxspeed = -ballxspeed;
		ballyspeed = calcBallDirection(paddle1y, bally, paddle1height);
		ballx = paddle1x + paddle1width + 1;
		createPowerup();
	}
	//check if ball hits right paddle
	if (ballx+ballsize > paddle2x && //ball right edge > paddle left edge
		ballx < (paddle2x + paddle2width) && //ball left edge < paddle right edge
		bally+ballsize > paddle2y &&  //ball bottom edge > paddle top edge
		bally < paddle2y + paddle2height) { //ball top edge < paddle bottom edge
		ballxspeed = -ballxspeed;
		ballyspeed = calcBallDirection(paddle2y, bally, paddle2height);
		ballx = paddle2x - ballsize - 1;
		createPowerup();
	}

	//check if balls hits powerup
	if (powerupsenabled &&
		ballx+ballsize > powerupx && //ball right edge > powerup left edge
		ballx < (powerupx + powerupsize) && //ball left edge < powerup right edge
		bally+ballsize > powerupy &&  //ball bottom edge > powerup top edge
		bally < powerupy + powerupsize) { //ball top edge < powerup bottom edge
		powerupx = 0;
		powerupy = 0;
		triggerPowerup(ballxspeed); //pass speed to know which player hit
	}
}

function createPowerup() {
	if (Math.random() < 0.25 && powerupsenabled && !powerupx && !powerupy) { //15% chance to create powerup on paddle hit
		//randomise coords within a range
		powerupx = Math.random() * ((canvas.width - 150) - 150) + 150;
		powerupy = Math.random() * ((canvas.height - 100) - 100) + 100;
	}
}

function triggerPowerup(ballxspeed: number) {
	const trigger = ballxspeed > 0 ? 1 : -1; //get ball direction to determine trigger player
	
	const powerupchoice = Math.random(); //4 different powerups rn
	if (powerupchoice < 0.25) {
		//increase paddle size
		document.getElementById("powerupInfo")!.textContent = "Paddle size increased!";
		if (trigger == 1 && paddle1height < 200) {
			paddle1height += 25;
		} else if (paddle2height < 200) {
			paddle2height += 25;
		}
	} else if (powerupchoice < 0.5) {
		//shrink opponent paddle
		document.getElementById("powerupInfo")!.textContent = "Opponent paddle shrunk!";
		if (trigger == 1 && paddle2height > 20) {
			paddle2height -= 7;
		} else if (paddle1height > 20) {
			paddle1height -= 7;
		}
	} else if (powerupchoice < 0.75) {
		//reverse opponent control
		document.getElementById("powerupInfo")!.textContent = "Opponent control reversed!";
		if (trigger == 1) {
			paddle2upspeed = -paddle2upspeed;
			paddle2downspeed = -paddle2downspeed;
		} else {
			paddle1upspeed = -paddle1upspeed;
			paddle1downspeed = -paddle1downspeed;
		}
	} else {
		//ballsize increase
		document.getElementById("powerupInfo")!.textContent = "Ball size increased!";
		if (ballsize < 50) {
			ballsize += 5;
		}
	}
}

async function saveMatchResult(tournament: any) {
	try {
		const apiUrl = getApiUrl('/api/match-result');
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify(tournament),
			credentials: 'include',
		});
		if (!response.ok)
			alert('failed saving match result');
	}
	catch (err) {
		alert('failed saving match result?');
	}
}

async function updateStatIfUserPlaysWithAi() {
	if (!aienabled)
		return ;
	const result = (winningplayer === 'Player 1') ? 'win' : 'lose';
	try {
		const apiUrl = getApiUrl('/api/stat');
		const response = await fetch(apiUrl, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({ result }),
			credentials: 'include',
		});
		if (!response.ok) {
			console.log('would not update if not sign in');
			return ;
		}
	}
	catch (err) {
		alert('didnt update stat versus AI');
	}
}

function gameLoop() {
	movePaddles();
	moveBall();
	drawElements();

	if ((player1score == winamount || player2score == winamount)) {
		//stop game loop
		clearInterval(interval);
		clearInterval(aiinterval);
		
		//add tournament ending screen
		if (tournamentdata && tournamentdata.started && tournamentdata.matches) {
			const currentMatch = tournamentdata.matches.find((match: any) => match.winner === null);
			if (currentMatch) {
				if (player1score == winamount) {
					//set winner in tournament data
					currentMatch.winner = currentMatch.user1;
					winningplayer = currentMatch.user1;
				} else if (player2score == winamount) {
					currentMatch.winner = currentMatch.user2;
					winningplayer = currentMatch.user2;
				}
				//increment matchnumber and update local storage
				tournamentdata.matchnumber++;
				localStorage.setItem('tournament', JSON.stringify(tournamentdata));

				saveMatchResult(tournamentdata);
				//reset scores
				player1score = 0;
				player2score = 0;
				//display winner info
				document.getElementById("winnerInfo")!.innerHTML = `<p>${winningplayer} wins!</p>`;
				document.getElementById("winnerInfo")!.innerHTML += `<button id="finish-button" class="px-4 py-2 bg-white text-black rounded">Finish match</button>`;
				document.getElementById("finish-button")!.addEventListener("click", () => {
					navigate('/tournament');
				});
			}
		}
		//add default ending screen
		else {
			if (player1score == winamount) {
				winningplayer = 'Player 1';
			} else if (player2score == winamount) {
				winningplayer = aienabled ? 'AI' : 'Player 2';
			}

			updateStatIfUserPlaysWithAi();
			//reset scores
			player1score = 0;
			player2score = 0;
			//display winner info
			document.getElementById("winnerInfo")!.innerHTML = `<p>${winningplayer} wins!</p>`;
			document.getElementById("winnerInfo")!.innerHTML += `<button id="finish-button" class="px-4 py-2 bg-white text-black rounded">Finish match</button>`;
			document.getElementById("finish-button")!.addEventListener("click", () => {
				navigate('/home');
			});
		}
	}
}

function initGameValues() {
	//init paddle1
	paddle1width = 15;
	paddle1height = 75;
	paddle1x = 25;
	paddle1upspeed = -12;
	paddle1downspeed = 12;
	//init paddle2
	paddle2width = 15;
	paddle2height = 75;
	paddle2x = canvas.width - 30;
	paddle2upspeed = -12;
	paddle2downspeed = 12;
	//init ball
	ballsize = 10;
	ballxspeedInit = 10;
	//powerup
	powerupsize = 35;
}

function resetRound() {
	//reset to default vals
	initGameValues();

	//clear powerup info text
	document.getElementById("powerupInfo")!.textContent = ""; 

	//reset ball position and invert direction
	ballx = (canvas.width / 2) - (ballsize / 2);
	bally = (canvas.height / 2) - (ballsize / 2);
	ballxspeed = -ballxspeed;
	ballyspeed = 0;

	//reset paddle positions
	paddle1y = (canvas.height / 2) - (paddle1height / 2);
	paddle2y = (canvas.height / 2) - (paddle2height / 2);
}

export function pongHandler() {
	//get tournament data from local storage
	var tournament = localStorage.getItem('tournament');
	if (tournament) {
		tournamentdata = JSON.parse(tournament);
	}
	else {
		tournamentdata = null;
	}

	//get canvas and its context
	canvas = document.getElementById("pongCanvas") as HTMLCanvasElement;
	ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

	initGameValues();

	//handle customisation vars
	ballxspeed = ballxspeedInit;
	document.getElementById("ballSpeed")?.addEventListener("input", () => {
		const speed_slider = (document.getElementById("ballSpeed") as HTMLInputElement).valueAsNumber;
		ballxspeed =  ballxspeedInit * (speed_slider / 100);
		document.getElementById("speedText")!.textContent = `Ball Speed: (${speed_slider}%)`;
	});
	winamount = 5;
	document.getElementById("winAmount")?.addEventListener("input", () => {
		const winamount_slider = (document.getElementById("winAmount") as HTMLInputElement).valueAsNumber;
		winamount = winamount_slider;
		document.getElementById("winAmountText")!.textContent = `Winning Score: (${winamount_slider})`;
		document.getElementById("winAmountInfoText")!.textContent = `First to ${winamount_slider} points wins`;
	});
	paddle1color = "#ffffff";
	paddle2color = "#ffffff";
	document.getElementById("paddle1Color")?.addEventListener("input", () => {
		paddle1color = (document.getElementById("paddle1Color") as HTMLInputElement).value;
		drawElements();
	});
	document.getElementById("paddle2Color")?.addEventListener("input", () => {
		paddle2color = (document.getElementById("paddle2Color") as HTMLInputElement).value;
		drawElements();
	});
	powerupsenabled = true;
	document.getElementById("powerupsEnabled")?.addEventListener("input", () => {
		powerupsenabled = (document.getElementById("powerupsEnabled") as HTMLInputElement).checked;
	});
	aienabled = false;
	document.getElementById("aiEnabled")?.addEventListener("input", () => {
		aienabled = (document.getElementById("aiEnabled") as HTMLInputElement).checked;
		document.getElementById("player2Name")!.textContent = aienabled ? "AI" : "Player 2";
	});

	//add tournament player names and title
	if (tournamentdata && tournamentdata.started && tournamentdata.matches) {
		const currentMatch = tournamentdata.matches.find((match: any) => match.winner === null);
		if (currentMatch) {
			document.getElementById("player1Name")!.textContent = currentMatch.user1;
			document.getElementById("player2Name")!.textContent = currentMatch.user2;
			document.getElementById("match-title")!.textContent = `Tournament Match ${tournamentdata.matchnumber}`;
			//turn off ai checkbox if tournament is active
			(document.getElementById("aiEnabled") as HTMLInputElement).disabled = true;
		}
	}

	resetRound(); //init positions of paddles and ball
	drawElements(); //draw initial stuff to canvas

	//on start button click
	document.getElementById("startButton")?.addEventListener("click", () => {
		//hide start button and info on click
		const startInfo = document.getElementById("startInfo");
		if (startInfo) {
			startInfo.style.visibility = "hidden";
		}
		//add event listeners for keypress
		document.addEventListener("keydown", function (event) {
			keys[event.key as keyof typeof keys] = true;
		});
		document.addEventListener("keyup", function (event) {
			keys[event.key as keyof typeof keys] = false;
		});
		//run game loop 60 times per second
		interval = setInterval(gameLoop, 1000 / 60);

		//run ai decision making once per second
		if (aienabled) {
			aiinterval = setInterval(aiMovement, 1000);
		}
	});
}
