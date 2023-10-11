export let envs = {
	projectId: process.env.APPWRITE_PROJECT_ID as string,
	projectEndPoint: process.env.APPWRITE_ENDPOINT as string,
	hostname: process.env.HOSTNAME as string,
} as {
	projectId?: string | undefined
	projectEndPoint?: string | undefined
	hostname?: string | undefined
}
