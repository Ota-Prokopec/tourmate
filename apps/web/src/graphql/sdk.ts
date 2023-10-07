import { getSdk } from '$src/graphql/generated';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://d10bbhb5-4444.euw.devtunnels.ms/graphql', {
	credentials: 'include'
});
export const sdk = getSdk(client);
