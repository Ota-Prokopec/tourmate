import { ID } from 'appwrite'
import { writable } from 'svelte/store'

import type { Writable } from 'svelte/store'
import type { Models, RealtimeResponseEvent, Storage } from 'appwrite'

export default (storage: Storage) => {
	const client = storage.client
	console.log(client)

	return class Bucket {
		constructor(public bucketId: string) {}

		getParamsFromURL(URL: string) {
			const fileId = URL.split('/')[8]
			const bucketId = URL.split('/')[6]
			return { fileId, bucketId }
		}

		createFile(file: File, permissions: string[] = []) {
			return storage.createFile(this.bucketId, ID.unique(), file, permissions)
		}

		deleteFile(file: string | Models.File) {
			return storage.deleteFile(this.bucketId, typeof file === 'string' ? file : file.$id)
		}

		updateFile(file: string | Models.File, permissions: string[] = []) {
			return storage.updateFile(this.bucketId, typeof file === 'string' ? file : file.$id, permissions)
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

		getFileContent(file: string | Models.File) {
			const fileContent = writable('')
			const loading = writable(true)

			const { href } = storage.getFileView(this.bucketId, typeof file === 'string' ? file : file.$id)

			this.subscribeFileUpdateCallback(file, () =>
				fetch(href)
					.then((res) => (res.ok ? res.text() : null))
					.then((res) => {
						fileContent.set(res ?? '')
						loading.set(false)
					}),
			)

			fetch(href)
				.then((res) => (res.ok ? res.text() : null))
				.then((res) => {
					fileContent.set(res ?? '')
					loading.set(false)
				})

			return [{ subscribe: fileContent.subscribe }, { subscribe: loading.subscribe }] as const
		}

		createUploadDispatcher(acceptManyFiles = false) {
			let files: File[] = []

			const eventUploadDirective = (node: HTMLInputElement) => {
				const eventListener = (e: any) => (files = acceptManyFiles ? Array.from(e.target.files) : [e.target.files[0]])

				node.addEventListener('change', eventListener)

				acceptManyFiles && node.setAttribute('multiple', 'multiple')

				return {
					destroy() {
						node.removeEventListener('change', eventListener)
					},
				}
			}

			const dispatchUpload = (permissions: string[] = []) => {
				return Promise.all(files.map((file) => this.createFile(file, permissions)))
			}

			return [eventUploadDirective, dispatchUpload] as const
		}

		createSubsciber(queries: string[] = [], search = '') {
			const filesStore = writable<Models.File[]>([])
			const loadingStore = writable(true)

			storage.listFiles(this.bucketId, queries, search).then(({ files }) => {
				files.forEach((file) => this.subscribeFileUpdate(file, filesStore))
				filesStore.set(files)
				loadingStore.set(false)
			})

			return [{ subscribe: filesStore.subscribe }, { subscribe: loadingStore.subscribe }] as const
		}

		createObserver() {
			const dataStore = writable<Models.File[]>([])

			client.subscribe(`buckets.${this.bucketId}.files`, (response: RealtimeResponseEvent<any>) => {
				if (response.events.includes(`buckets.${this.bucketId}.files.*.create`)) {
					dataStore.update((current) => {
						current.push(response.payload)
						return current
					})

					this.subscribeFileUpdate(response.payload, dataStore)
				}
			})

			return { subscribe: dataStore.subscribe }
		}

		subscribeFileUpdate(file: Models.File, filesStore: Writable<Models.File[]>) {
			this.subscribeFileUpdateCallback(file, ({ event }) => {
				if (event === 'update')
					return filesStore.update((current) => {
						current[current.indexOf(file)] = file
						return current
					})

				filesStore.update((current) => {
					current.splice(current.indexOf(file), 1)
					return current
				})
			})
		}

		subscribeFileUpdateCallback(file: string | Models.File, callback: ({ fileId, event }: { fileId: string; event: 'update' | 'delete' }) => any) {
			client.subscribe(`buckets.${this.bucketId}.files.${typeof file === 'string' ? file : file.$id}`, (response: RealtimeResponseEvent<any>) => {
				if (response.events.includes(`buckets.${this.bucketId}.files.${typeof file === 'string' ? file : file.$id}.update`)) {
					return callback({ fileId: typeof file === 'string' ? file : file.$id, event: 'update' })
				}

				if (response.events.includes(`buckets.${this.bucketId}.files.${typeof file === 'string' ? file : file.$id}.delete`)) {
					return callback({ fileId: typeof file === 'string' ? file : file.$id, event: 'delete' })
				}
			})
		}
	}
}
