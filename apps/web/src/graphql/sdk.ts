import { getSdk } from '$src/graphql/generated';
import { GraphQLClient } from 'graphql-request';
import clientOptions from './clientOptions';
import { PUBLIC_SESSION_NAME } from '$env/static/public';
import { storage } from '$lib/utils/lsStore';

const client = new GraphQLClient(clientOptions[0], { ...clientOptions[1] });

const clientWithCookie = client.setHeader(
	'Cookie',
	`${PUBLIC_SESSION_NAME}=${storage.cookieFallback?.a_session_experiences}`
);
console.log(clientWithCookie);

export const sdk = getSdk(clientWithCookie);
