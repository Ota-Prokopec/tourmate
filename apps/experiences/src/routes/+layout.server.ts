import { trpc } from '$lib/trpc';
import { ServerLoad, redirect } from '@sveltejs/kit';
import type { TGetAccountOutputData } from '$lib/server/routers/account/routes/get';
import appwriteSSR from '@app/appwrite-ssr';

export const load: ServerLoad = async (event) => {
	try {
		return {
			user: await trpc(event).account.get.query()
		};
	} catch (error) {
		if (event.url.href?.includes('auth')) {
			return { user: null };
		}
		throw redirect(302, '/auth/login');
	}
};
