import { collections as collections_ } from './collections'
import appwriteSSR from '@app/appwrite-ssr-graphql'
import type { Types } from '@app/appwrite-ssr-graphql'

const myAppwriteClient: ReturnType<typeof appwriteSSR.setProject> = appwriteSSR.setProject({
	projectEndPoint: process.env.APPWRITE_ENDPOINT as string,
	projectId: process.env.APPWRITE_PROJECT_ID as string,
})

const setCookie = (cookies: Types.Cookie[]) => set(myAppwriteClient.setCookie(cookies))

const setSession = (session: string) => set(myAppwriteClient.setSession(session))

const setNone = () => set(myAppwriteClient.none())

const set = (appwrite: Types.AppwriteSSR) => {
	const collections = collections_(appwrite)

	return { collections, ...appwrite }
}
export default { setCookie, setSession, setNone }
