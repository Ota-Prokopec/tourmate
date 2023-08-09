import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const params = {
	domain: process.env.HOSTNAME,
	secure: false,
	path: '/',
	httpOnly: true
};

export const load: PageServerLoad = (event) => {
	const urlParams = new URLSearchParams(event.url.searchParams);
	const secret = urlParams.get('secret');
	console.log(secret);
	if (!secret) throw error(409);

	event.cookies.set(`a_session_${'experiences'}`, secret, params);
	event.cookies.set(`a_session_${'experiences'}_legacy`, secret, params);
	return {
		session: secret
	};
};
