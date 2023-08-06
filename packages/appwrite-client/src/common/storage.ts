import { Client, Storage } from 'appwrite'
import { createBucketDispatcher } from '../Ludvik/main'

export default (client: Client) => {
	const Bucket = createBucketDispatcher(new Storage(client))

	const profilePictures = new Bucket('profile-pictures')
	const quizPictures = new Bucket('quiz-pictures')

	return { profilePictures, quizPictures }
}
