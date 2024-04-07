import { PUBLIC_SESSION_NAME } from '$env/static/public';
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import { cookieSettings } from '@app/settings';

const schema = z.object({
	session: z.string().nonempty()
});

export const POST = async (event) => {
	const payload = schema.parse(await event.request.json());

	event.cookies.set(PUBLIC_SESSION_NAME, payload.session, {
		...cookieSettings,
		domain: process.env.CLIENT_HOSTNAME_COOKIES
	});

	return json(payload);
};
