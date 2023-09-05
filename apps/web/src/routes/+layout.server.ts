import { ServerLoad, redirect } from '@sveltejs/kit';
import { sdk } from '$src/graphql/sdk';
import { sdkssr } from '$src/graphql/sdkssr';

export const load: ServerLoad = async (event) => {
	try {
		const userRes = await sdkssr(event.cookies.getAll()).getAccount();
		console.log(userRes);

		return {
			user: await userRes.getAccount
		};
	} catch (error) {
		if (event.url.href?.includes('auth')) {
			return { user: null };
		}
		throw redirect(302, '/auth/login');
	}
};
