import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const params = {
	domain: 'localhost',
	secure: false,
	path: '/',
	httpOnly: true
};

export const load: PageServerLoad = (event) => {
	const urlParams = new URLSearchParams(event.url.searchParams);
	const secret = urlParams.get('secret');
	if (!secret) throw error(409);
	event.cookies.set(`a_session_${process.env.APPWRITE_PROJECT_ID}`, secret, params);
	event.cookies.set(`a_session_${process.env.APPWRITE_PROJECT_ID}_legacy`, secret, params);
	return {
		session: secret
	};
};
