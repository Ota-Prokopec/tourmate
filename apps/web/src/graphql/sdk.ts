import { getSdk } from '$src/graphql/generated';
import { GraphQLClient } from 'graphql-request';
import clientOptions from './clientOptions';
import { PUBLIC_IOS_AUTHORIZATION_HEADER_NAME, PUBLIC_SESSION_NAME } from '$env/static/public';
import lsStore, { storage } from '$lib/utils/lsStore';
import { browser } from '$app/environment';

const client = new GraphQLClient(clientOptions[0], { ...clientOptions[1] });

let localStorageSession: string | undefined = undefined;
lsStore.subscribe((e) => {
	localStorageSession = e.cookieFallback?.a_session_experiences;
});

const clientWithCookie = client.setHeader(
	PUBLIC_IOS_AUTHORIZATION_HEADER_NAME,
	localStorageSession ?? 'not-set'
);

export const sdk = getSdk(clientWithCookie);
