import { getSdk } from '$src/graphql/generated';
import { GraphQLClient } from 'graphql-request';
import clientOptions from './clientOptions';

const client = new GraphQLClient(...clientOptions);
export const sdk = getSdk(client);
