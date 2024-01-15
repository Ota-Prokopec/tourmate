import { v2 as cloudinary } from 'cloudinary'
import buckets_ from './storage/buckets'

const options = cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
	secure: true,
})

//FIXME: process.env.CLOUDINARY_ROOT_FOLDER_NAME ?? 'tourmate'
const buckets = buckets_(options, process.env.CLOUDINARY_ROOT_FOLDER_NAME ?? 'tourmate')

export default buckets
