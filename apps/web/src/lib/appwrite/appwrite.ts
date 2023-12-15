import appwrite from '@app/appwrite-client';
import Queries from './tools/query';
import { Client } from 'appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import myCollections from './tools/collections';
import { Preferences } from '@app/ts-types';

const client = appwrite<Preferences>(
	new Client().setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PUBLIC_APPWRITE_PROJECT_ID)
);

const collections = myCollections(client.Collection);
const user = client.user;

export default client;

export { collections, Queries, user };
