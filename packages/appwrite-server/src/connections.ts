import { Client, Storage } from 'node-appwrite'
import { Avatars, Databases, Functions, Graphql, Locale, Teams, Users } from 'node-appwrite'
import database from './database'
import Collections from './collections'
import { Account } from './account'
import { getSessionFromCookie } from './authorizationUtils'
import Localization from './localization'

export const adminAppwriteClient = new Client()
	.setProject(process.env.APPWRITE_PROJECT_ID ?? '')
	.setEndpoint(process.env.APPWRITE_ENDPOINT ?? '')
	.setKey(process.env.APPWRITE_API_KEY ?? '')

export default class Connection {
	set(client: Client) {
		const appWrite = newClient(() => client)
		return appWrite
	}
	setJWT(jwt: string) {
		const appWrite = newClient((client) => client.setJWT(jwt))
		return appWrite
	}
	setKey(key: string) {
		const appWrite = newClient((client) => client.setKey(key))
		return appWrite
	}
	setAdmin() {
		return newClient(() => adminAppwriteClient)
	}
	setNone() {
		return newClient()
	}
	async setSession(session: string) {
		const { jwt } = await this.setNone().account.createJwtWithSession(session)
		return this.setJWT(jwt)
	}
	async setCookie(cookies: { name: string; value: string }[]) {
		const session = getSessionFromCookie(cookies)
		return this.setSession(session)
	}
} //provide jwt

const newClient = (callback?: (client: Client) => Client) => {
	if (!process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_ENDPOINT) throw new Error('project id or endpoint is not set')
	let client = new Client().setProject(process.env.APPWRITE_PROJECT_ID).setEndpoint(process.env.APPWRITE_ENDPOINT)

	if (callback) client = callback(client)

	const teams = new Teams(client)
	const functions = new Functions(client)
	const locale = new Localization(client)
	const avatars = new Avatars(client)
	const graphql = new Graphql(client)
	const databases = new Databases(client)
	const users = new Users(client)
	const Collection = database(databases)
	const collections = Collections(databases)
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
	}
}
