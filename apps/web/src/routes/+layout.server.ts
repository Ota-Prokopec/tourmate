import { ServerLoad, redirect } from '@sveltejs/kit';
import { sdkssr } from '$src/graphql/sdkssr';

export const load: ServerLoad = async (event) => {
	try {
		const userRes = await sdkssr(event).getAccount();

		return {
			user: await userRes.getAccount
		};
	} catch (error) {
		console.log(error);

		if (event.url.href?.includes('auth')) {
			return { user: null };
		}
		throw redirect(302, '/auth/login');
	}
};
