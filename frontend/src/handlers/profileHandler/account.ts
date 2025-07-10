import { logoutHandler } from "../logoutHandler";
import { getApiUrl } from "../../utils/config";

export async function hookDeletion() {
	document.getElementById('deleteAccount')?.addEventListener('click', async () => {
		try {
			const apiUrl = getApiUrl('/api/account');
			const response = await fetch(apiUrl, {
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
