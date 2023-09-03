import appwriteSSR from '@app/appwrite-ssr'

export const client: ReturnType<typeof appwriteSSR.setProject> = appwriteSSR.setProject({
	projectEndPoint: process.env.APPWRITE_ENDPOINT as string,
	projectId: process.env.APPWRITE_PROJECT_ID as string,
})
