import { Client, Teams, Functions, Locale, Avatars, Graphql, Storage, Databases, Users, type Models, Role, Permission } from 'node-appwrite'
import database from './database'
import appwriteNodeCollestionsFunc from './collections'
import permissions from './permissions'
import { Query } from 'node-appwrite'
import buckets_func from './buckets'
import { Account } from './account'

export const adminAppwriteClient = new Client()
	.setProject(process.env.APPWRITE_PROJECT_ID ?? '')
	.setEndpoint(process.env.APPWRITE_ENDPOINT ?? '')
	.setKey(process.env.APPWRITE_API_KEY ?? '')

export { permissions, Client, Teams, Functions, Locale, Avatars, Graphql, Account, Databases, Users, Models, Role, Permission, Query }

export default {
	set: (client: Client) => {
		const appWrite = newClient(() => client)
		return appWrite
	},
	setJWT: (jwt: string) => {
		const appWrite = newClient((client) => client.setJWT(jwt))
		return appWrite
	},
	setKey: (key: string) => {
		const appWrite = newClient((client) => client.setKey(key))
		return appWrite
	},
	setAdmin: () => {
		return newClient(() => adminAppwriteClient)
	},
	none: () => {
		return newClient()
	},
} //provide jwt

const newClient = (callback?: (client: Client) => Client) => {
	if (!process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_ENDPOINT) throw new Error('project id or endpoint is not set')
	let client = new Client().setProject(process.env.APPWRITE_PROJECT_ID ?? '').setEndpoint(process.env.APPWRITE_ENDPOINT ?? '')

	if (callback) client = callback(client)

	const teams = new Teams(client)
	const functions = new Functions(client)
	const locale = new Locale(client)
	const avatars = new Avatars(client)
	const graphql = new Graphql(client)
	const databases = new Databases(client)
	const users = new Users(client)
	const Collection = database(databases)
	const collections = appwriteNodeCollestionsFunc(databases)
	const buckets = buckets_func(new Storage(client))
	const account = new Account(client)
	return {
		client,
		teams,
		functions,
		locale,
		avatars,
		graphql,
		account,
		databases,
		Collection,
		users,
		collections,
		Storage,
		buckets,
	}
}

export const appwriteDocumentKeys = ['$id', '$updatedAt', '$createdAt', '$collectionId', '$databaseId', '$permissions'] as const
