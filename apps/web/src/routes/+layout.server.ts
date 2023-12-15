import { ServerLoad, error, redirect } from '@sveltejs/kit';
import { sdkssr } from '$src/graphql/sdkssr';

export const load: ServerLoad = async (event) => {
	const routeId = event.route.id;
	if (!routeId) throw error(404);
	try {
		const userRes = await sdkssr(event).getAccount();

		return {
			user: userRes.getAccount
		};
	} catch (error) {
		if (event.url.href?.includes('auth')) {
			return { user: null };
		}

		throw redirect(307, '/auth/login');
	}
};
