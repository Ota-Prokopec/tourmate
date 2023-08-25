import { trpc } from '$lib/trpc';
import { ServerLoad, redirect } from '@sveltejs/kit';
import type { TGetAccountOutputData } from '$lib/server/routers/account/routes/get';
import appwriteServer from '@app/appwrite-server';

export const load: ServerLoad = async (event): Promise<{ user: TGetAccountOutputData }> => {
	return {
		user: await trpc(event).account.get.query()
	};
};
