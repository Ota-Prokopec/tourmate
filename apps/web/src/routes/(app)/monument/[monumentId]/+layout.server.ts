import type { LayoutServerLoad } from './$types';
import { sdkssr } from '$src/graphql/sdkssr';

export const ssr = false;

export const load: LayoutServerLoad = async (event) => {
	const { monumentId } = event.params;

	const monument = (
		await sdkssr(event).getMonumentCard({
			id: monumentId
		})
	).getMonument;

	return {
		monument
	};
};
