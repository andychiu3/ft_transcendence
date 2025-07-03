import { hookPassword } from "../handlers/profileHandler/password";
import { handleNameChange } from "../handlers/profileHandler/name";
import { hookAvatar } from "../handlers/profileHandler/avatar";
import { hookDeletion } from "../handlers/profileHandler/account";
import { escapeHTML } from "../utils/escapeHTML";

export function	renderProfile(data: any): void {
	const main = document.getElementById('main-content') as HTMLElement;
			main.innerHTML = `
			<div class="flex-col space-y-4">
				<div class="flex items-center gap-x-4">
					<img id="avatarImg" src="" class="w-16 h-16 rounded-full" />
					<label for="avatarInput" class="cursor-pointer text-gray-400 hover:text-gray-600"> ✎ </label>
					<input type="file" id="avatarInput" class="hidden" accept="image/*"/>
				</div>
				<div class="flex gap-x-8">
					<span class="w-[150px]"> Email: </span>
					<span> ${escapeHTML(data.email)} </span>
				</div>
				<div class="flex gap-x-4">
					<span class="w-[140px]"> password_hashed: </span>
					<button type="button" id="showPasswordForm" class="w-[10px] text-gray-400 hover:text-gray-600 text-sm"> ✎ </button>
					<span> ${data.password_hash || ''} </span>
				</div>
				<div class="flex gap-x-4">
					<span class="w-[140px]"> Name: </span>
					<div id="nameContainer" class="flex items-center gap-x-2">
						<button type="button" id="changeName" class="w-[10px] text-gray-500 hover:text-gray-600 text-sm"> ✎ </button>
						<span id="profileName" class="ml-2"> ${escapeHTML(data.name)} </span>
						<input id="nameInput" type="text" class="hidden ml-2 border rounded-md p-1 text-sm" />
						<button id="saveName" type="button" class="hidden rounded px-2 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600"> Save </button>
					</div>
				</div>
				<div class="flex gap-x-8">
					<span class="w-[150px]"> Stat versus AI: </span>
					<span> win: ${data.win}, lose: ${data.lose} ${data.lose > data.win ? '-> you loser' : ''} </span>
				</div>
				<div class="flex gap-x-8">
					<span class="w-[150px]"> Created at: </span>
					<span> ${data.created_at} </span>
				</div>
				<div> 
					<button id="deleteAccount" type="button" class="rounded px-2 py-1 w-20 text-white bg-blue-500 hover:bg-blue-600"> delete </button> 
				</div>
			</div>
			<div id="passwordForm" class="hidden flex flex-col space-y-4 p-10">
				<input type="password" id="oldPassword" placeholder="current password" class="text-center placeholder-gray-200 p-2 border rounded-md" required>
				<input type="password" id="newPassword" placeholder="new password" class="text-center placeholder-gray-200 p-2 border rounded-md" required>
				<div class="flex justify-center space-x-3">
					<button type="button" id="submitPasswordChange" class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"> Save </button>
					<button type="button" id="hidePasswordForm" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"> cancel </button>
				</div>
			</div>
			`;
			hookPassword();
			handleNameChange();
			hookAvatar(data);
			hookDeletion();
}
