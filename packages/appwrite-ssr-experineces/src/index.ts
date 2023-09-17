import { buckets as buckets_ } from './buckets'
import { collections as collections_ } from './collections'
import appwriteSSR from '@app/appwrite-ssr'
import { Types } from '@app/appwrite-ssr'

const myAppwriteClient: ReturnType<typeof appwriteSSR.setProject> = appwriteSSR.setProject({
	projectEndPoint: process.env.APPWRITE_ENDPOINT as string,
	projectId: process.env.APPWRITE_PROJECT_ID as string,
})

const setCookie = (cookies: Types.Cookie[]) => set(myAppwriteClient.setCookie(cookies))

const setSession = (session: string) => set(myAppwriteClient.setSession(session))

const setNone = () => set(myAppwriteClient.none())

const set = (appwrite: Types.AppwriteSSR) => {
	const collections = collections_(appwrite)
	const buckets = buckets_(appwrite)

	return { buckets, collections, ...appwrite }
}
export default { setCookie, setSession, setNone }
