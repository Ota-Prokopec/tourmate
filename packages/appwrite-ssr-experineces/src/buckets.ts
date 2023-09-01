import appwriteSSR from '@app/appwrite-ssr'

export const buckets = (session: string) => {
	const { Bucket } = appwriteSSR.setSession(session)

	const experiencesPictures = new Bucket('experiences-pictures')
	const profilePictures = new Bucket('profile-pictures')
	const monumentsPictures = new Bucket('monuments-pictures')

	return {
		experiencesPictures,
		profilePictures,
		monumentsPictures,
	}
}
