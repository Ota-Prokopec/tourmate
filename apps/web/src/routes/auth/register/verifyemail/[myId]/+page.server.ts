export const ssr = false;

export const load = async (event) => {
	const { params, url } = event;
	const userId = url.searchParams.get('userId');
	const secret = url.searchParams.get('secret');
	const myId = params?.myId;

	if (!userId || !secret) throw new Error('Missing userId');

	return {
		params: { userId, secret, myId }
	};
};
