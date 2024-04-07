import { post } from '@app/utils';

export const setClientCookieSession = async (session: string) => {
	return await post('/api/auth/setCookie', { session: session });
};
