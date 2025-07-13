import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http'; // includes headers, method and url
import 'dotenv/config';
import { jwtAuthenticator } from './jwtAuth';
import { parse } from 'url';

const wss = new WebSocketServer({ port: 3001, host: '0.0.0.0' });

const onlineUsers = new Set();
const userFriendsList = new Map();

function	getFriends(userId: number) : Set<string | number> {
	if (!userFriendsList.has(userId))
		userFriendsList.set(userId, new Set());
	return userFriendsList.get(userId);
}

function	areFriends(userId: number, targetId: number) : boolean{
	return getFriends(userId).has(targetId);
}

function	addFriend(userId: number, targetId: number) {
	if (areFriends(userId, targetId))
		return ;

	const userFriends = getFriends(userId);
	const targetFriends = getFriends(targetId);
	userFriends.add(targetId);
	targetFriends.add(userId);
}

wss.on('connection', async (ws: WebSocket, request: IncomingMessage) => {
	console.log('-> connected.');

	let	userId;
	try {
		const parseUrl = parse(request.url || '', true);
		userId = parseUrl.query.token;
		if (!userId || Array.isArray(userId)) {
			console.error('user ID invalid');
			ws.close();
			return ;
		}

		// const payload = await jwtAuthenticator(request);
		// userId = payload.id;
		// console.log('user id:', userId, typeof userId);
		// microservices communication which is required from subject.
		// const response = await fetch(`${process.env.BACKEND_URL}/api/auth/verify`, {
		// 	headers: { 
		// 		'Cookie': request.headers.cookie || '', 
		// 		'X-From': 'WebSocket' 
		// 	}
		// });
		// if (!response.ok)
		// 	throw new Error('backend user validation failed.');

		onlineUsers.add(Number(userId));
		console.log(`User: ${userId} online`);
	}
	catch (err) {
		console.error(err.message);
		ws.close();
		return ;
	}

	ws.on('message', (data: string) => {
		const msg = JSON.parse(data);
		// console.log(msg);
		if (msg.method === 'checkOnline') {
			const online = onlineUsers.has(msg.id);
			ws.send(JSON.stringify({ method: 'onlineStatus', id: msg.id, online }));
			// console.log(onlineUsers);
		}
		else if (msg.method === 'addFriend') {
			const targetId = msg.targetId;
			addFriend(userId, targetId);
			// console.log(userFriendsList);
			ws.send(JSON.stringify({ method: 'friendAdded', id: targetId }));
		}
		else if (msg.method === 'checkFriendship') {
			const targetId = msg.targetId;
			if (areFriends(userId, targetId))
				ws.send(JSON.stringify({ method: 'isFriend', id: targetId, isFriend: true }));
			// console.log(userFriendsList);
		}
		else
			ws.send(JSON.stringify({ method: 'error', message: 'unknown cmd' }));
	});

	ws.on('close', () => {
		onlineUsers.delete(userId);
		console.log('-> disconnected');
	});
});
