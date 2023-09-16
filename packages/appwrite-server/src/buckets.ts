import { Client } from 'node-appwrite'
import storage_func from './storage'

export default (client: Client) => {
	const Bucket = storage_func(client)

	const experiencesPictures = new Bucket('experiences-pictures')
	const profilePictures = new Bucket('profile-pictures')
	const monumentsPictures = new Bucket('monuments-pictures')

	return {
		experiencesPictures,
		profilePictures,
		monumentsPictures,
	}
}
