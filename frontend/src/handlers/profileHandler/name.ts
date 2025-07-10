import { getApiUrl } from "../../utils/config";

function	toggleNameEdit(edit: boolean) {
	const profileName = document.getElementById('profileName')!;
	const changeBtn = document.getElementById('changeName')!;
	const nameInput = document.getElementById('nameInput') as HTMLInputElement;
	const saveBtn = document.getElementById('saveName')!;

	if (edit) {
		profileName.classList.add('hidden');
		changeBtn.classList.add('invisible');
		nameInput.classList.remove('hidden');
		saveBtn.classList.remove('hidden');
		nameInput.value = profileName.textContent || '';
		nameInput.focus();
	}
	else {
		nameInput.classList.add('hidden');
		saveBtn.classList.add('hidden');
		profileName.classList.remove('hidden');
		changeBtn.classList.remove('invisible');
	}
}

async function submitNameChange(newName: string): Promise<boolean> {
	try {
		const apiUrl = getApiUrl('/api/profile/name');
		const response = await fetch(apiUrl, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ newName }),
			credentials: 'include',
		});
		if (response.ok) {
			alert('name updated.');
			return true;
		}
		else {
			alert('name updating failed');
			return false;
		}
	}
	catch {
		alert('name updating failed?');
		return false;
	}
}

export function	handleNameChange() {
	const profileName = document.getElementById('profileName')!;
	const changeBtn = document.getElementById('changeName')!;
	const nameInput = document.getElementById('nameInput') as HTMLInputElement;
	const saveBtn = document.getElementById('saveName')!;

	changeBtn.addEventListener('click', () => {
		toggleNameEdit(true);
	});

	saveBtn.addEventListener('click', async () => {
		const newName = nameInput.value.trim();
		if (newName === '' || newName === profileName.textContent) {
			toggleNameEdit(false);
			return ;
		}
		const nameChange = await submitNameChange(newName);
		if (nameChange)
			profileName.textContent = newName;
		toggleNameEdit(false);
	});
}
