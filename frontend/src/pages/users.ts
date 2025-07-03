import { escapeHTML } from "../utils/escapeHTML";
import { setupAddFriendBtn } from "../handlers/usersHandler";
import { checkUserOnline, checkFriendship } from "../utils/userWebSocket";
import * as usersHandler from "../handlers/usersHandler";

interface User {
	id: number;
	email: string;
	name: string;
	created_at: string;
}

function	getUsersTableData(data: User[]) {
	const rows = data.map((user: User) => {
		const onlineStatus = usersHandler.getOnlineStatusDisplay(user.id);
		const buttonStatus = usersHandler.getFriendBtnClass(user.id);
		const buttonText = usersHandler.getFriendBtnText(user.id);

		return `
			<tr class="hover:bg-gray-50">
				<td id="onlineStatus${user.id}" class="text-center p-3"> ${onlineStatus} </td>
				<td class="text-center p-3"> ${escapeHTML(user.email)} </td>
				<td class="text-center p-3"> ${escapeHTML(user.name)} </td>
				<td class="text-center p-3"> ${user.created_at} </td>
				<td class="text-center p-3"> 
					<button 
						id="addFriend${user.id}"
						class="w-1/3 ${buttonStatus} rounded text-white px-4 py-2"
						${usersHandler.getFriendBtnText(user.id) === 'added' ? 'disabled' : ''}>
						${buttonText} 
					</button>
				</td>
			</tr>
			`;
	});
	return rows.join('');
}

export async function	renderUsers(data: User[]) {
	const main = document.getElementById('main-content') as HTMLElement;

	if (data.length === 0) { // should not happen tho since self is included
		main.innerHTML = `<h2 class="p-8"> no other users </h2>`
		return ;
	}

	data.forEach(user => {
		checkUserOnline(user.id);
		checkFriendship(user.id);
		// usersHandler.updateUserUI(user.id);
	});

	const UsersTableData = getUsersTableData(data);
	main.innerHTML = `
	<div class="flex-1 min-h-screen">
		<table class="w-full border-collapse text-sm">
			<thead>
				<tr class="bg-gray-200">
					<th class="w-1/5 p-5 text-center"> on/offline </th>
					<th class="w-1/5 p-5 text-center"> Email </th>
					<th class="w-1/5 p-5 text-center"> Name </th>
					<th class="w-1/5 p-5 text-center"> Register at </th>
					<th class="w-1/5 p-5 text-center"> add friend</th>
				</tr>
			</thead>
			<tbody> ${UsersTableData} </tbody>
		</table>
	</div>
	`;
	setupAddFriendBtn();
	// usersHandler.updateAllUsersUI();
}
