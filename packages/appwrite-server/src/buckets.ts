import { Storage } from 'node-appwrite'
import storage_func from './storage'

export default (storage: Storage) => {
	const Bucket = storage_func(storage)
	const profilePictures = new Bucket('profile-pictures')
	const quizPictures = new Bucket('quiz-pictures')
	return {
		profilePictures,
		quizPictures,
	}
}
