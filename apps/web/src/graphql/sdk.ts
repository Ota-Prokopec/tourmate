import { getSdk } from '$src/graphql/generated';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('http://localhost:4444/graphql', { credentials: 'include' });
export const sdk = getSdk(client);
