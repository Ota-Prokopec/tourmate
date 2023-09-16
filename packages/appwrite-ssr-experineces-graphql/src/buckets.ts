import appwriteSSR from '@app/appwrite-ssr-graphql'

export const buckets = (appwrite: ReturnType<typeof appwriteSSR.setCookie>) => {
	const { Bucket } = appwrite

	const experiencesPictures = new Bucket('experiences-pictures')
	const profilePictures = new Bucket('profile-pictures')
	const monumentsPictures = new Bucket('monuments-pictures')

	return {
		experiencesPictures,
		profilePictures,
		monumentsPictures,
	}
}
