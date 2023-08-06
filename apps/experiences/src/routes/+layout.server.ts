import { trpc } from '$lib/trpc';
import { ServerLoad, redirect } from '@sveltejs/kit';
import type { TGetAccountOutputData } from '$lib/server/routers/account/routes/get';

export const load: ServerLoad = async (event): Promise<{ user: TGetAccountOutputData | null }> => {
	try {
		return {
			user: await trpc(event).account.get.mutate()
		};
	} catch (error) {
		console.log(error);

		if (event.url.href?.includes('auth')) {
			return { user: null };
		}
		//throw redirect(302, '/auth/login');
	}
};
