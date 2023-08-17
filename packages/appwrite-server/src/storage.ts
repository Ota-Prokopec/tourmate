import { Base64 } from '@app/ts-types'
import { ID, InputFile, Storage } from 'node-appwrite'
import { Readable } from 'stream'
const exlududingPrefix = 'unchangeable-'
import { encode } from 'node-base64-image'

export default (storage: Storage) => {
	return class Bucket {
		constructor(public bucketId: string) {
			this.bucketId = bucketId
		}

		getFile(fileId: string) {
			return storage.getFile(this.bucketId, fileId)
		}
		async createFile(
			base64: Base64,
			permissions: string[] | undefined = undefined,
			filename = 'file.png',
			type = 'image/png',
			fileId: string = ID.unique(),
		) {
			const options = {
				headers: {
					type: type,
				},
			}
			const image = await encode(base64, options)
			const inputFile = new InputFile(Readable.from(image), filename, Buffer.byteLength(image))

			return await storage.createFile(this.bucketId, fileId, inputFile, permissions)
		}
		listFiles() {
			return storage.listFiles(this.bucketId)
		}
		getFileView(fileId: string) {
			return storage.getFileView(this.bucketId, fileId)
		}
		updateFile(fileId: string, permissions: string[]) {
			if (fileId.includes(exlududingPrefix)) throw new Error('Cannot update bucket with excluding prefix')
			return storage.updateFile(this.bucketId, fileId, permissions)
		}
		getFileURL(fileId: string) {
			const url =
				`${process.env.APPWRITE_ENDPOINT}/storage/buckets/${this.bucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT_ID}` as unknown
			return url as string
		}
		getIdFromURL(URL: string) {
			const id = URL.split('/')[6]
			console.log(id)

			return id
		}
	}
}
