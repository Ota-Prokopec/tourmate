import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const urlParams = new URLSearchParams(event.url.searchParams);

	//authorization
	const secret = urlParams.get('secret');

	if (!secret) throw error(409);

	//getting params
	const username = urlParams.get('username');
	const myId = urlParams.get('myId');

	//for ssr
	await event.cookies.set(`a_session_${process.env.APPWRITE_PROJECT_ID}`, secret, {
		sameSite: 'none',
		domain: process.env.CLIENT_HOSTNAME,
		secure: true,
		maxAge: 1000000000,
		httpOnly: true,
		path: '/'
	});

	return {
		session: secret,
		username,
		myId
	};
};
