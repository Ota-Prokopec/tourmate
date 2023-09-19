import { Base64 } from '@app/ts-types'
import { base64ToBlob, isURL } from '@app/utils'
import { ID, Storage, Models, InputFile } from 'node-appwrite'
import { Client } from 'node-appwrite'
import { EncodeOptions, encode } from 'node-base64-image'
import { Readable } from 'stream'

export default (client: Client) => {
	const storage = new Storage(client)

	return class Bucket {
		constructor(public bucketId: string) {
			this.bucketId = bucketId
		}

		getFile(fileId: string) {
			return storage.getFile(this.bucketId, fileId)
		}

		getParamsFromURL(URL: string) {
			const fileId = URL.split('/')[8]
			const bucketId = URL.split('/')[6]
			return { fileId, bucketId }
		}

		async createFile(
			base64: Base64,
			permissions: string[] | undefined = undefined,
			filename = 'file.png',
			type = 'image/png',
			fileId: string = ID.unique(),
		) {
			const options: Parameters<typeof encode>['1'] = {
				headers: {
					type: type,
				},
			}

			const image = await encode(base64, options)
			const inputFile = InputFile.fromStream(Readable.from(image), filename, Buffer.byteLength(image))

			return await storage.createFile(this.bucketId, fileId, inputFile, permissions)
		}

		deleteFile(file: string | Models.File) {
			return storage.deleteFile(this.bucketId, typeof file === 'string' ? file : file.$id)
		}
		listFiles() {
			return storage.listFiles(this.bucketId)
		}

		updateFile(id: string, name: string, permissions: string[] | undefined): Promise<Models.File>
		updateFile(file: Models.File, name: string, permissions: string[] | undefined): Promise<Models.File>
		updateFile(param: string | Models.File, name: string, permissions: string[] | undefined = []): Promise<Models.File> {
			return storage.updateFile(this.bucketId, typeof param === 'string' ? param : param.$id, permissions)
		}

		getFilePreview(file: string | Models.File) {
			return storage.getFilePreview(this.bucketId, typeof file === 'string' ? file : file.$id)
		}

		getFileDownload(file: string | Models.File) {
			return storage.getFileDownload(this.bucketId, typeof file === 'string' ? file : file.$id)
		}

		getFileView(file: string | Models.File) {
			return storage.getFileView(this.bucketId, typeof file === 'string' ? file : file.$id)
		}
		getFileURL(fileId: string) {
			const url = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${this.bucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT_ID}`
			if (!isURL(url)) throw new Error('type of url is not valid')
			return url
		}
		getIdFromURL(URL: string) {
			const id = URL.split('/')[6]
			return id
		}
	}
}
