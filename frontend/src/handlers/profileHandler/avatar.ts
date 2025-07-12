import { getApiUrl } from "../../utils/config";

// ideally should be processed by backend
// but I like the way of static so keeping this part for now
function	setAvatar(userId: number) {
	const avatarImg = document.getElementById('avatarImg') as HTMLImageElement;
	const avatarUrl = getApiUrl(`/avatar/upload/${userId}.png` + `?${Date.now}`);
	const fallbackUrl = getApiUrl('/avatar/42.svg');
	console.log('avatarUrl: ', avatarUrl, 'defaultUrl: ', fallbackUrl);

	avatarImg.src = avatarUrl; // Date.now() forces browser to reload the pic
	avatarImg.onerror = () => {
		avatarImg.onerror = null;
		avatarImg.src = fallbackUrl; // GET /avatar/default.png HTTP/1.1
	}
}

async function	uploadAvatar(userId: number, file: File) {
	const formData = new FormData();
	formData.append('avatar', file);

	try {
		const apiUrl = getApiUrl('/api/avatar')
		const response = await fetch(apiUrl, {
			method: 'POST',
			body: formData,
			credentials: 'include',
		});
		const result = await response.json();

		if (response.ok) {
			alert('avatar updated.');
			setAvatar(userId)
		}
		else
			alert( result.message || 'avatar updating failed.');
	}
	catch (err) {
		alert('Failed updating avatar?');
	}
}

export async function	hookAvatar(data: any) {
	const avatarImg = document.getElementById('avatarImg') as HTMLImageElement;
	const avatarInput = document.getElementById('avatarInput') as HTMLInputElement;

	setAvatar(data.id);
	avatarInput.addEventListener('change', async () => {
		const file = avatarInput.files?.[0];
		if (!file)
			return ;
		if (file.size > 5 * 1024 * 1024) {
			alert('img limitation: 5MB');
			return ;
		}
		console.log('user id: ', data.id);
		await uploadAvatar(data.id , file);
	})
}
