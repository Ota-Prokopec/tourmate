import type { Location } from '@app/ts-types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const location = params.location.split('/').map((l) => parseInt(l)) as Location;
	return {
		newFamousPlace: { location }
	};
};
