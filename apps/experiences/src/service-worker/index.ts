import { trpc } from '$lib/trpc';
import type { Location } from '@app/ts-types';

self.addEventListener('message', async (event) => {
	const location: Location = event.data;

	const monuments = await trpc({
		url: { origin: '' }
	}).experience.monument.getListByLocation.query({ location: location, zoom: 1 });

	event.source?.postMessage(monuments);
});
