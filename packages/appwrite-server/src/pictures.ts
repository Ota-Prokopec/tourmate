import { Storage } from 'node-appwrite'

export default (storage: Storage) => {
	return {
		profilePictures: storage,
	}
}
