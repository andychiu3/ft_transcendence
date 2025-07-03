import { getFriendStatus } from "../utils/userWebSocket";

export function	getOnlineStatusDisplay(userId: number) : string {
	const status = getFriendStatus(userId);
	// console.log(status);
	if (!status)
		return '-';
	return status.isFriend ? (status.online ? '🟢' : '🔴') : '-';
}

export function	getFriendBtnClass(userId: number): string {
	const status = getFriendStatus(userId);
	return status.isFriend ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600';
}

export function	getFriendBtnText(userId: number): string {
	const status = getFriendStatus(userId);
	return status.isFriend ? 'added' : 'add';
}

function	updateOnlineStatus(userId: number) {
	const statusElement = document.getElementById(`onlineStatus${userId}`);
	if (statusElement && getFriendStatus(userId).isFriend)
		statusElement.textContent = getOnlineStatusDisplay(userId);
}

function	updateFriendButton(userId: number) {
	const button = document.getElementById(`addFriend${userId}`) as HTMLButtonElement;
	if (button) {
		button.textContent = getFriendBtnText(userId);

		const isFriend = getFriendStatus(userId).isFriend;
		button.disabled = isFriend;
		if (isFriend) {
			button.classList.remove('bg-blue-500', 'hover:bg-blue-600');
			button.classList.add('bg-gray-400', 'cursor-not-allowed');
		}
		else {
			button.classList.add('bg-blue-500', 'hover:bg-blue-600');
			button.classList.remove('bg-gray-400', 'cursor-not-allowed');	
		}
	}
}

export function	updateUserUI(targetId: number) {
	const status = getFriendStatus(targetId);
	if (status) {
		updateFriendButton(targetId);
		updateOnlineStatus(targetId);
	}
}

export function	updateAllUsersUI() {
	Object.keys(getFriendStatus).forEach((userId: string) => {
		updateUserUI((Number(userId)));
	})
}

export function	setupAddFriendBtn() {
	document.querySelectorAll('[id^="addFriend"]').forEach(button => {
		const targetId = Number(button.id.replace('addFriend', ''));
		button.addEventListener('click', () => {
			import('../utils/userWebSocket').then(({ addFriend }) => addFriend(targetId));
		});
	})
}

// export function	setupAddFriendBtn() {
// 	document.querySelectorAll('[id^="addFriend"]').forEach(button => {
// 		const targetId = Number(button.id.replace('addFriend', ''));
// 		button.addEventListener('click', () => addFriend(targetId));
// 	})
// }
