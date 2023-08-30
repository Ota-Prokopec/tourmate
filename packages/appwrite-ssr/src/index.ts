import { Avatars, Client, Databases, Functions, Graphql, Locale, Teams } from 'appwrite'
import account_, { getSessionFromCookie } from './auth/account'
import databse_ from './databases/Collection'
import storage_ from './storage/storage'
import permissions from './permissions/permissions'

const setSession = (session: string) => {
	return set((client) => {
		client.headers['X-Fallback-Cookies'] = JSON.stringify({ [`a_session_${process.env.APPWRITE_PROJECT_ID}`]: session })
		return client
	})
}
const setCookie = (
	cookies: {
		name: string
		value: string
	}[],
) => setSession(getSessionFromCookie(cookies))

const set = (callback?: (c: Client) => Client) => {
	//if you dont pass session be sure you are on client-side
	let client = new Client().setEndpoint(process.env.APPWRITE_ENDPOINT).setProject(process.env.APPWRITE_PROJECT_ID)
	if (callback) client = callback(client)

	const Auth = account_(client)
	const Collection = databse_(client)
	const Bucket = storage_(client)
	const account = new Auth()
	const teams = new Teams(client)
	const functions = new Functions(client)
	const locale = new Locale(client)
	const avatars = new Avatars(client)
	const graphql = new Graphql(client)
	const databases = new Databases(client)

	return {
		Auth,
		Collection,
		Bucket,
		account,
		teams,
		functions,
		locale,
		avatars,
		graphql,
		databases,
		client,
	}
}

export default {
	setSession,
	setCookie,
}
export { permissions }
