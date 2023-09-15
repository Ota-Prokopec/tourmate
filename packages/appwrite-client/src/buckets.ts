import { Client } from 'appwrite'
import storage from './common/storage'

export default (client: Client) => {
	const Bucket = storage(client)

	const experiencesPictures = new Bucket('experiences-pictures')
	const profilePictures = new Bucket('profile-pictures')
	const monumentsPictures = new Bucket('monuments-pictures')

	return { experiencesPictures, profilePictures, monumentsPictures }
}
