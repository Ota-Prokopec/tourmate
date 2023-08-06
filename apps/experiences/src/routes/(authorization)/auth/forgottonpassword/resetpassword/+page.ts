export const load = async ({ url }) => {
	const userId = url.searchParams.get('userId');
	const secret = url.searchParams.get('secret');

	if (!userId || !secret) throw new Error('Missing userId');

	return {
		resetPasswordTokens: { userId, secret }
	};
};
