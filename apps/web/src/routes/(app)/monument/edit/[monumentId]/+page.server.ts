import { sdkssr } from '$src/graphql/sdkssr';
import { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const monument = (await sdkssr(event).getMonument({ id: event.params.monumentId })).getMonument;
	return {
		monument
	};
};
