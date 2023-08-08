import { Storage } from 'node-appwrite'
import storage_func from './storage'

export default (storage: Storage) => {
	const Bucket = storage_func(storage)

	const experiencesPictures = new Bucket('experiences-pictures')
	const profilePictures = new Bucket('profile-pictures')

	return {
		experiencesPictures,
		profilePictures,
	}
}
