export const load = async ({ params, url }) => {
	const userId = url.searchParams.get('userId');
	const secret = url.searchParams.get('secret');
	const myId = params?.myId;

	if (!userId || !secret) throw new Error('Missing userId');

	return {
		userId,
		secret,
		myId
	};
};
