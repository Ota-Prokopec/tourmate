import { getSdk } from '$src/graphql/generated';
import { GraphQLClient } from 'graphql-request';
import { Types } from '@app/appwrite-ssr';

type Input = { cookies: { getAll: () => Types.Cookie[] } };

const client = new GraphQLClient('https://d10bbhb5-4444.euw.devtunnels.ms/graphql', {
	credentials: 'include'
});

export const sdkssr = (event: Input) => {
	const stringCookies = event.cookies
		.getAll()
		.map((cookie) => `${cookie.name}=${cookie.value};`)
		.join('');

	const cookiedClient = client.setHeader('Cookie', stringCookies);
	return getSdk(cookiedClient);
};
