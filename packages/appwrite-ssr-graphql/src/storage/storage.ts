import { ID, Storage, type Models } from 'appwrite'
import type { Client } from 'appwrite'

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
			base64: string,
			permissions: string[] | undefined = undefined,
			filename = 'file.png',
			type = 'image/png',
			fileId: string = ID.unique(),
		) {
			const file = new File([base64], filename, { type: type })

			return await storage.createFile(this.bucketId, fileId, file, permissions)
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
			return storage.updateFile(this.bucketId, typeof param === 'string' ? param : param.$id, name, permissions)
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
			const url =
				`${client.config.endpoint}/storage/buckets/${this.bucketId}/files/${fileId}/view?project=${client.config.project}` as unknown
			return url as URL
		}
		getIdFromURL(URL: string) {
			const id = URL.split('/')[6]
			return id
		}
	}
}
