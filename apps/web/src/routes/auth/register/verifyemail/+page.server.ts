export const ssr = false;

export const load = async (event) => {
	const { url } = event;
	const userId = url.searchParams.get('userId');
	const secret = url.searchParams.get('secret');
	const myId = url.searchParams.get('myId');
	const username = url.searchParams.get('username');

	if (!userId || !secret || !myId || !username) throw new Error('Missing params');

	return {
		params: { token: { userId, secret }, myId, username }
	};
};
