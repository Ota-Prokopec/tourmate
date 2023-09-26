// @ts-nocheck
import { ServerLoad, redirect } from '@sveltejs/kit';
import { sdkssr } from '$src/graphql/sdkssr';

export const load = async (event: Parameters<ServerLoad>[0]) => {
	try {
		const userRes = await sdkssr(event).getAccount();

		return {
			user: userRes.getAccount
		};
	} catch (error) {
		if (event.url.href?.includes('auth')) {
			return { user: null };
		}
		//	throw redirect(302, '/auth/login');
	}
};
