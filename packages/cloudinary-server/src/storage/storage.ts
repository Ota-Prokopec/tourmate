import { Base64 } from '@app/ts-types'
import { v2 as cloudinary, ConfigOptions, UploadApiResponse } from 'cloudinary'

export class Cloudinary {
	constructor(public options: ConfigOptions, public folder: string) {}

	async uploadBase64(base64: Base64 | string) {
		return (await cloudinary.uploader.upload(base64, {
			...this.options,
			folder: this.folder,
		})) as UploadApiResponse & {
			url: URL
		}
	}
	async deleteFiles(...files: string[]) {
		return await cloudinary.api.delete_resources(
			files.map((file) => `${this.folder}/${file}`),
		)
	}
	getFileNameFromUrl(url: URL) {
		const splits = url.toString().split('/')
		const fileSplit = splits[splits.length - 1]
		if (!fileSplit) throw new Error('Invalid URL - not able to be splitted')
		const file = fileSplit.replace('.webp', '')
		return file
	}
}
