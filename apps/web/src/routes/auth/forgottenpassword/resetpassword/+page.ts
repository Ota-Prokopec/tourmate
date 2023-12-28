import { error } from '@sveltejs/kit';

export const load = async ({ url }) => {
	const userId = url.searchParams.get('userId');
	const secret = url.searchParams.get('secret');

	if (!userId || !secret) throw error(400, { message: 'invalid userId or secret', code: 400 });

	return {
		resetPasswordTokens: { userId, secret }
	};
};
