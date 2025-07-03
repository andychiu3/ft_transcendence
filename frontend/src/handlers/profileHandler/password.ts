export function	showPasswordForm() {
	document.getElementById('passwordForm')?.classList.remove('hidden');
}

export function	hidePasswordForm() {
	document.getElementById('passwordForm')?.classList.add('hidden');
}

export async function submitPasswordChange() {
	const oldPassword = (document.getElementById('oldPassword') as HTMLInputElement).value;
	const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;

	try {
		const response = await fetch('/api/profile/password', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({ oldPassword, newPassword })
		});

		const result = await response.json();
		if (response.ok)
			alert('Password updated.');
		else
			alert('Failed to update password: ' + result.message);
		hidePasswordForm();
	}
	catch {
		alert('catched err: failed to update password.');
		hidePasswordForm();
	}
}

export async function hookPassword() {
	document.getElementById('showPasswordForm')?.addEventListener('click', showPasswordForm);
	document.getElementById('submitPasswordChange')?.addEventListener('click', submitPasswordChange);
	document.getElementById('hidePasswordForm')?.addEventListener('click', hidePasswordForm);
}
