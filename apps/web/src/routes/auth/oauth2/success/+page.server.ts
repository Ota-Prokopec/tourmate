import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SERVER_HOSTNAME_COOKIES, APPWRITE_PROJECT_ID } from '$env/static/private';

console.log(SERVER_HOSTNAME_COOKIES);

const params = {
	sameSite: 'lax',
	domain: SERVER_HOSTNAME_COOKIES,
	secure: true,
	maxAge: 1000000000,
	httpOnly: true
} as const;

export const load: PageServerLoad = (event) => {
	const urlParams = new URLSearchParams(event.url.searchParams);
	const secret = urlParams.get('secret');
	console.log(secret);
	if (!secret) throw error(409);

	console.log('session');

	event.cookies.set(`a_session_${APPWRITE_PROJECT_ID}`, secret);
	event.cookies.set(`a_session_${APPWRITE_PROJECT_ID}_legacy`, secret, params);

	console.log('session');

	return {
		session: secret
	};
};
