import { getSdk } from '$src/graphql/generated';
import { GraphQLClient } from 'graphql-request';
import { Types } from '@app/appwrite-ssr';

const client = new GraphQLClient('http://localhost:4444/graphql', { credentials: 'include' });
export const sdkssr = (cookies: Types.Cookie[]) => {
	const stringCookies = cookies.map((cookie) => `${cookie.name}=${cookie.value};`).join('');
	const cookiedClient = client.setHeader('Cookie', stringCookies);
	return getSdk(cookiedClient);
};
