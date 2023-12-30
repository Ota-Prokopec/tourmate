import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const params = {
	sameSite: 'lax',
	domain: process.env.SERVER_HOSTNAME_COOKIES,
	secure: true,
	maxAge: 1000000000,
	httpOnly: true,
	path: '/'
} as const;

export const load: PageServerLoad = (event) => {
	const urlParams = new URLSearchParams(event.url.searchParams);

	//authorization
	const secret = urlParams.get('secret');

	if (!secret) throw error(409);

	//getting params
	const username = urlParams.get('username');
	const myId = urlParams.get('myId');

	event.cookies.set(`a_session_${process.env.APPWRITE_PROJECT_ID}`, secret, params);
	event.cookies.set(`a_session_${process.env.APPWRITE_PROJECT_ID}_legacy`, secret, params);

	return {
		session: secret,
		username,
		myId
	};
};
