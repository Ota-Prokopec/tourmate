import { ID, Storage, Models } from 'appwrite'
import { Client } from 'appwrite'

export default (client: Client) => {
	const storage = new Storage(client)

	return class Bucket {
		constructor(public bucketId: string) {
			this.bucketId = bucketId
		}

		getParamsFromURL(URL: URL) {
			const fileId = URL.toString().split('/')[8]
			const bucketId = URL.toString().split('/')[6]
			return { fileId, bucketId }
		}

		createFile(file: File, permissions: string[] = []) {
			return storage.createFile(this.bucketId, ID.unique(), file, permissions)
		}

		deleteFile(file: string | Models.File) {
			return storage.deleteFile(this.bucketId, typeof file === 'string' ? file : file.$id)
		}

		getFile(fileId: string) {
			return storage.getFile(this.bucketId, fileId)
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
				`${process.env.APPWRITE_ENDPOINT}/storage/buckets/${this.bucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT_ID}` as unknown
			return url as string
		}
		getIdFromURL(URL: string) {
			const id = URL.split('/')[6]
			return id
		}
	}
}
