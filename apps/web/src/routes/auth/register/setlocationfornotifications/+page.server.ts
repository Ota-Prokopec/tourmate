import { ServerLoad, error, redirect } from '@sveltejs/kit';
import { sdkssr } from '$src/graphql/sdkssr';
import { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const parentData = await event.parent();
	return parentData;
};
