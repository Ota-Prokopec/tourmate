// @ts-nocheck
import { ServerLoad } from '@sveltejs/kit';
import { sdkssr } from '$src/graphql/sdkssr';

export const load = async (event: Parameters<ServerLoad>[0]) => {
	const userRes = await sdkssr(event).getAccount();

	return {
		user: userRes.getAccount
	};
};
