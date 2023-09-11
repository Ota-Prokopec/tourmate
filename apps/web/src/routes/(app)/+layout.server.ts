import { ServerLoad } from '@sveltejs/kit';
import { sdkssr } from '$src/graphql/sdkssr';

export const load: ServerLoad = async (event) => {
	const userRes = await sdkssr(event).getAccount();

	return {
		user: userRes.getAccount
	};
};
