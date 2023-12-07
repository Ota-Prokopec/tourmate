import { getSdk } from '$src/graphql/generated';
import { GraphQLClient } from 'graphql-request';
import clientOptions from './clientOptions';

const client = new GraphQLClient(...clientOptions);

const cookies = `${process.env.TESTING_SESSION_NAME}=${process.env.TESTING_SESSION}`;

const cookiedClient = client.setHeader('Cookie', cookies);
export const testingSdk = getSdk(cookiedClient);
