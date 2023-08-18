import { goto } from '$app/navigation';
import { notify } from '@app/utils';
import { watchUsersLocation } from '@app/utils/src/utils/location';

export const autoLocalizationStart = async () => {
	const registration = await navigator.serviceWorker.ready;

	watchUsersLocation((location) => {
		if (!registration.active) throw new Error('registration.active is not defined');

		registration.active.postMessage(location);
		navigator.serviceWorker.startMessages();
	});

	navigator.serviceWorker.addEventListener('message', async (event) => {
		const notification = await notify('a monument is close to you');
		notification.onclick = () => {
			goto('');
		};
	});
};
