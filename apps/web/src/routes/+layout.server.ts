import { sdkssr } from '$src/graphql/sdkssr';
import { error, redirect } from '@sveltejs/kit';
import { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const routeId = event.route.id;
	if (!routeId) throw error(404);

	try {
		const user = (await sdkssr(event).getAccount()).getAccount;

		return {
			user
		};
	} catch (error) {
		console.log(error);

		if (event.url.href?.includes('auth')) {
			return { user: null };
		}

		throw redirect(307, '/auth/login');
	}
};
