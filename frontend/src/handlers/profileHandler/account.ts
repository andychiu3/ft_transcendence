import { logoutHandler } from "../logoutHandler";

export async function hookDeletion() {
	document.getElementById('deleteAccount')?.addEventListener('click', async () => {
		try {
			const response = await fetch('/api/account', {
				method: 'DELETE',
				credentials: 'include',
			});
			if (response.ok) {
				alert('account deleted. logging out...');
				logoutHandler();
			}
			else
				alert('failed to delete account');
		}
		catch {
			alert('failed to delete account?');
		}
	});
}
