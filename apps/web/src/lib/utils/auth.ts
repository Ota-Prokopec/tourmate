import { PUBLIC_SESSION_NAME } from '$env/static/public';

export const setClientCookieSession = async (session: string) => {
	const expires = new Date(Date.now() + 999999999999 * 1000);

	const expireTimeString = expires.toUTCString();
	document.cookie = `${PUBLIC_SESSION_NAME}=${session};path=/;maxAge=99999999999999;expires=${expireTimeString}`;
};
