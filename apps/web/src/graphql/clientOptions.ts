import { RequestConfig } from 'graphql-request/build/esm/types';
import { PUBLIC_SERVER_HOSTNAME } from '$env/static/public';

const url = import.meta.env.DEV
	? `${PUBLIC_SERVER_HOSTNAME ?? 'http://localhost'}:4444/graphql`
	: `${PUBLIC_SERVER_HOSTNAME ?? 'http://localhost'}/graphql`;

export default [
	url,
	{
		credentials: 'include'
	} as RequestConfig
] as const;
