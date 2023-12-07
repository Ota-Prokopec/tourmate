import { ServerLoad } from '@sveltejs/kit';

export const ssr = false;
export const load: ServerLoad = (event) => {
	console.log(event.cookies.getAll());
};
