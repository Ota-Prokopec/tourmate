import { ConfigOptions } from 'cloudinary'
import { Cloudinary } from './storage'

export default (options: ConfigOptions, rootFileName: string) => {
	const monuments = new Cloudinary(options, `${rootFileName}/monuments`)
	const profilePictures = new Cloudinary(options, `${rootFileName}/profilePictures`)
	const experiences = new Cloudinary(options, `${rootFileName}/experiences`)

	return {
		monuments,
		profilePictures,
		experiences,
	}
}
