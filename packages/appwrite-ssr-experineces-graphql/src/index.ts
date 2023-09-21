import { collections as collections_ } from './collections'
import appwriteSSR, { Types } from '@app/appwrite-ssr-graphql'

const myAppwriteClient: ReturnType<typeof appwriteSSR.setProject> = appwriteSSR.setProject({
	projectEndPoint: process.env.APPWRITE_ENDPOINT as string,
	projectId: process.env.APPWRITE_PROJECT_ID as string,
})

const setCookie = (cookies: Types.Cookie[]) => set(myAppwriteClient.setCookie(cookies))

const setSession = (session: string) => set(myAppwriteClient.setSession(session))

const setNone = () => set(myAppwriteClient.none())

const set = (appwrite: Types.AppwriteSSR) => {
	const collections = collections_(appwrite.Collection)

	return { collections, ...appwrite }
}

//@ts-ignore
export default { setCookie, setSession, setNone }
