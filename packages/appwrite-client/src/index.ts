import { Client, Teams, Functions, Locale, Avatars, Graphql, Account, Databases, Role, type Models, Permission, ID } from 'appwrite'
import { createAuthDispatcher, createCollectionDispatcher } from './svelte/main'
import { Query } from 'appwrite'
import createCollections from './collections'
import storage from './common/storage'
import createSvelteCollections from './svelteCollections'
import myBuckets from './buckets'

const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('experiences')

const teams = new Teams(client)
const functions = new Functions(client)
const locale = new Locale(client)
const avatars = new Avatars(client)
const graphql = new Graphql(client)
const account = new Account(client)
const databases = new Databases(client)
const svelteCollections = createSvelteCollections(databases)

const Auth = createAuthDispatcher(account)

//export const Bucket = createBucketDispatcher(new Storage(client))
const SvelteCollection = createCollectionDispatcher(databases)

const Bucket = storage(client)
const collections = createCollections(client)
const buckets = myBuckets(client)

const user = new Auth()
const isLoading = user.isLoading

export default client
export {
	client,
	teams,
	SvelteCollection,
	Bucket,
	svelteCollections,
	functions,
	locale,
	buckets,
	avatars,
	graphql,
	account,
	databases,
	user,
	isLoading,
	collections,
	Query,
	Role,
	Models,
	Permission,
	ID,
	createAuthDispatcher,
	createCollectionDispatcher,
}
