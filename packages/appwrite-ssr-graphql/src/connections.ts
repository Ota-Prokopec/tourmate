import { Avatars, Client, Databases, Functions, Graphql, Teams } from 'appwrite'
import account_, { getSessionFromCookie } from './auth/account'
import databse_ from './databases/Collection'
import storage_ from './storage/storage'
import type { Types } from './types/Types'
import Locale from './locale/locale'

let envs = {
	projectId: process.env.APPWRITE_PROJECT_ID,
	projectEndPoint: process.env.APPWRITE_ENDPOINT,
}

export const set = (callback?: (c: Client) => Client) => {
	if (!envs.projectId || !envs.projectEndPoint) throw new Error('project id or endpoint is not set')
	let client = new Client().setProject(process.env.APPWRITE_PROJECT_ID).setEndpoint(process.env.APPWRITE_ENDPOINT)

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

const connections = {
	setSession: (session: string | undefined) => {
		return set((client) => {
			client.headers['X-Fallback-Cookies'] = JSON.stringify({
				[`a_session_${process.env.APPWRITE_PROJECT_ID}`]: session,
			})
			return client
		})
	},
	setCookie: (cookies: Types.Cookie[]) => connections.setSession(getSessionFromCookie(cookies)),

	none: () => set(),
}

const setProject = ({ projectId, projectEndPoint }: { projectId: string; projectEndPoint: string }) => {
	envs = {
		projectId,
		projectEndPoint,
	}
	return { ...connections, ...set() }
}

export { connections, setProject }
