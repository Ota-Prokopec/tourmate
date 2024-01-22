import { RequestConfig, RequestMiddleware } from 'graphql-request/build/esm/types';
import { PUBLIC_IOS_AUTHORIZATION_HEADER_NAME, PUBLIC_SERVER_HOSTNAME } from '$env/static/public';
import { browser } from '$app/environment';
import { storage } from '$lib/utils/lsStore';

const url = `${PUBLIC_SERVER_HOSTNAME}/graphql`;

const requestMiddleware: RequestMiddleware = (req) => {
	return {
		...req,
		headers: {
			...req.headers,
			[PUBLIC_IOS_AUTHORIZATION_HEADER_NAME]: browser
				? storage.cookieFallback?.a_session_experiences
				: undefined
		}
	};
};

export default [
	url,
	{
		cache: 'default',
		requestMiddleware: requestMiddleware,
		credentials: 'include'
	} as RequestConfig
] as const;
