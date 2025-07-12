import { updateUserUI } from "../handlers/usersHandler";
import { getWebSocketUrl } from "./config";

export interface FriendStatus {
	id: number;
	isFriend: boolean;
	online: boolean;
}

const statusMap: Record<number, FriendStatus> = {};

// const getWebSocketUrl = () => {
// 	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
// 	const host = window.location.host;
// 	let url = `${protocol}//${host}/ws`;
// 	return url;
// }


// does not seem to work for Safari. does not swap itself if relative route given?
// let ws = new WebSocket('/ws');
let ws = new WebSocket(getWebSocketUrl());
console.log(getWebSocketUrl());

export function	connectWebSocket() {
	if (!ws || ws.readyState === WebSocket.CLOSED)
		ws = new WebSocket(getWebSocketUrl());
	ws.onopen = () => console.log('ws connected');
	ws.onclose = () => console.log('ws closed');
	ws.onerror = (error) => console.log('websocket error: ', error);
	ws.onmessage = (event) => {
		if (ws.readyState !== WebSocket.OPEN) {
			console.log('ws yet to be ready');
			return ;
		}
		const msg = JSON.parse(event.data);
		console.log(msg);

		if (msg.method === 'friendAdded') {
			if (statusMap[msg.id])
				statusMap[msg.id].isFriend = true;
			else
				statusMap[msg.id] = { id: msg.id, isFriend: true, online: false };
			updateUserUI(msg.id);
		}
		else if (msg.method === 'onlineStatus') {
			if (statusMap[msg.id])
				statusMap[msg.id].online = msg.online;
			else
				statusMap[msg.id] = { id: msg.id, isFriend: false, online: msg.online};
			updateUserUI(msg.id);
		}
		else if (msg.method === 'isFriend') {
			if (statusMap[msg.id])
				statusMap[msg.id].isFriend = msg.isFriend;
			else
				statusMap[msg.id] = { id: msg.id, isFriend: msg.isFriend, online: false};
			updateUserUI(msg.id);
		}
	}
}

export function	addFriend(userId: number) {
	if (ws && ws.readyState === WebSocket.OPEN) {
		ws.send(JSON.stringify({
			method: 'addFriend',
			targetId: userId,
		}))
	}
}

export function	checkFriendship(userId: number) {
	if (ws && ws.readyState === WebSocket.OPEN) {
		ws.send(JSON.stringify({
			method: 'checkFriendship',
			targetId: userId,
		}))
	}
}

export function	checkUserOnline(userId: number) {
	if (ws && ws.readyState === WebSocket.OPEN) {
		ws.send(JSON.stringify({
			method: 'checkOnline',
			id: userId
		}));
	}
}

export function	getFriendStatus(userId: number): FriendStatus {
	return statusMap[userId] || { id: userId, isFriend: false, online: false };
}

export function	disconnectWebSocket() {
	if (ws && ws.readyState === WebSocket.OPEN)
		ws.close();
}
