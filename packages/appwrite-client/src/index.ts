import { Client, Teams, Functions, Locale, Avatars, Graphql, Account, Databases, Storage, Role, type Models, Permission, ID } from 'appwrite'
import { createAuthDispatcher, createBucketDispatcher, createCollectionDispatcher } from './Ludvik/main'
import { Query } from 'appwrite'
import permissions from './common/permissions'
import createCollections from './collections'
import createStorage from './common/storage'
import createSvelteCollections from './svelteCollections'
import { SSRAccount } from './common/SSRAccount'

const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('experiences')

const teams = new Teams(client)
const functions = new Functions(client)
const locale = new Locale(client)
const avatars = new Avatars(client)
const graphql = new Graphql(client)
const account = new Account(client)
const databases = new Databases(client)
//const storage = new Storage(client)
const svelteCollections = createSvelteCollections(databases)

//@ts-ignore
const Auth = createAuthDispatcher(account)

//@ts-ignore
export const Bucket = createBucketDispatcher(new Storage(client))
//@ts-ignore
const SvelteCollection = createCollectionDispatcher(databases)

const buckets = createStorage(client)
const collections = createCollections(databases)

const user = new Auth()
const isLoading = user.isLoading

export const ssrAccount = new SSRAccount(client, 'experiences')

export default client
export {
	client,
	teams,
	SvelteCollection,
	permissions,
	buckets,
	svelteCollections,
	functions,
	locale,
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
	createBucketDispatcher,
	createCollectionDispatcher,
}
