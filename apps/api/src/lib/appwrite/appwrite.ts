import { collectionsClient, collectionsAdmin } from './tools/collections'
import { type Types, setProject } from '@app/appwrite-ssr-graphql'
import Queries from './tools/query'

//TODO: remove ts-ignore
//@ts-ignore
const client: ReturnType<typeof setProject> = setProject({
	endpoint: process.env.APPWRITE_ENDPOINT || '',
	projectId: process.env.APPWRITE_PROJECT_ID || '',
	apiKey: process.env.APPWRITE_API_KEY,
	hostname: process.env.SERVER_HOSTNAME || '',
})

const setCookie = (cookies: Types.Cookie[]) => setClient(client.setCookie(cookies))
const setSession = (session: string) => setClient(client.setSession(session))
const setNone = () => setClient(client.none())
const setAdmin = () => setApiKey(client.setAdmin())

const setClient = (appwrite: ReturnType<Types.AppwriteSSR['none']>) => {
	const collections = collectionsClient(appwrite.Collection)
	return { collections, Queries, ...appwrite }
}
const setApiKey = (appwrite: ReturnType<Types.AppwriteSSR['setAdmin']>) => {
	const collections = collectionsAdmin(appwrite.Collection)
	return { collections, Queries, ...appwrite }
}

export default { setCookie, setSession, setNone, setAdmin }
export { Queries }
