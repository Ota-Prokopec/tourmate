import { Client, Storage } from 'appwrite'
import { createBucketDispatcher } from '../Ludvik/main'

export default (client: Client) => {
	const Bucket = createBucketDispatcher(new Storage(client))

	const experiencesPictures = new Bucket('experiences-pictures')
	const profilePictures = new Bucket('profile-pictures')
	const monumentsPictures = new Bucket('monuments-pictures')

	return { experiencesPictures, profilePictures, monumentsPictures }
}
