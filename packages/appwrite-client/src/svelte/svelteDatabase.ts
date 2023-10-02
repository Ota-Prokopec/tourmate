import { writable } from 'svelte/store'
import { Query, ID } from 'appwrite'

import type { Writable } from 'svelte/store'
import type { Models, RealtimeResponseEvent, Databases } from 'appwrite'
import { executeFunctionBeforeAndAfterClassMethod } from '@app/utils'
import { DatabaseValueTypes } from '@app/ts-types'

const convertObjectInfoArray = (data: Record<string, string>): string[] => {
	return Object.values(data)
}

export default (databases: Databases) => {
	const client = databases.client

	class Collection<TDocumentGet extends Models.Document, TDocumentCreate extends Record<string, DatabaseValueTypes>> {
		constructor(public databaseId: string, public collectionId: string) {}

		createDocument(data: TDocumentCreate, permissions: string[] | undefined = undefined, id: string = ID.unique()) {
			return databases.createDocument(this.databaseId, this.collectionId, id, data, permissions)
		}

		updateDocument(documentId: string | Models.Document, data: Partial<TDocumentCreate>, permissions: string[] | undefined = undefined) {
			if (!Array.isArray(permissions) && permissions) permissions = convertObjectInfoArray(permissions)
			return databases.updateDocument(
				this.databaseId,
				this.collectionId,
				typeof documentId === 'string' ? documentId : documentId.$id,
				data,
				permissions,
			)
		}

		async deleteDocument(filters: string[]): Promise<{}>
		async deleteDocument(document: TDocumentGet): Promise<{}>
		async deleteDocument(documentId: string): Promise<{}>
		async deleteDocument(param: string | TDocumentGet | string[]): Promise<{}> {
			if (typeof param === 'string') {
				return databases.deleteDocument(this.databaseId, this.collectionId, param)
			} else if (Array.isArray(param) && typeof param[0] === 'string') {
				return this.getDocument(param)[0].subscribe((document) => {
					if (!document) throw new TypeError('Document you are trying to delete does not exist')
					return databases.deleteDocument(this.databaseId, this.collectionId, document.$id)
				})
			} else if ((param as TDocumentGet) && !Array.isArray(param)) {
				return databases.deleteDocument(this.databaseId, this.collectionId, param.$id)
			} else throw new Error('property does not exists')
		}

		async deleteDocuments(filters: string[]) {
			await this.listDocuments(filters)[0].subscribe(async (documents) => {
				if (documents.length === 0) throw new TypeError('No document found to delete')
				return await Promise.all(documents.map((document) => this.deleteDocument(document.$id)))
			})
		}

		listenInsert(filter: (document: Models.Document) => boolean = () => true): Readonly<Writable<TDocumentGet[]>> {
			const dataStore = writable<TDocumentGet[]>([])

			client.subscribe(
				`databases.${this.databaseId}.collections.${this.collectionId}.documents`,
				(response: RealtimeResponseEvent<any>) => {
					if (response.events.includes(`databases.${this.databaseId}.collections.${this.collectionId}.documents.*.create`)) {
						if (filter(response.payload) === false) return

						dataStore.update((current) => {
							current.push(response.payload)
							return current
						})

						this.subscribeCollectionUpdate(response.payload, dataStore)
					}
				},
			)

			return dataStore
		}

		getDocument(documentId: string): Readonly<[Writable<TDocumentGet>, Writable<boolean>]>
		getDocument(filters: string[]): Readonly<[Writable<TDocumentGet>, Writable<boolean>]>
		getDocument(documentId: string | string[]): Readonly<[Writable<TDocumentGet>, Writable<boolean>]> {
			const store = writable<TDocumentGet>()
			const loading = writable(true)

			if (typeof documentId === 'string') {
				databases.getDocument<TDocumentGet>(this.databaseId, this.collectionId, documentId).then((data) => {
					store.set(data)
					loading.set(false)

					if (!data) throw new Error('Document that matches the query not found')

					this.subscribeCollectionUpdate(data, store)
				})
			} else {
				databases.listDocuments<TDocumentGet>(this.databaseId, this.collectionId, documentId).then((data) => {
					if (data.total < 1) throw new Error('Document that matches the query not found')
					if (data.total > 1)
						throw new Error('Multiple documents found, use listDocuments instead or try to be more specific in your query')

					store.set(data.documents[0] ?? null)
					loading.set(false)

					if (!data.documents[0]) return undefined

					this.subscribeCollectionUpdate(data.documents[0], store)
				})
			}

			return [store, loading] as const
		}

		listDocuments(
			filters: string[] = [],
			offset: number = 0,
			limit: number = -1,
			orderType: 'ASC' | 'DESC' | null = null,
		): Readonly<[Writable<TDocumentGet[]>, Writable<boolean>]> {
			const loadingStore = writable(true)
			const dataStore = writable<TDocumentGet[]>([])

			if (Number.isInteger(offset) === false) throw new TypeError('offset must be a non-negative integer')
			if (offset < 0) throw new TypeError('limit must be a non-negative integer')
			if (Number.isInteger(limit) === false) throw new TypeError('limit must be a non-negative integer or -1')
			if (limit < -1) throw new TypeError('limit must be a non-negative integer or -1')

			const queries = [...filters]
			if (offset > 0) queries.push(Query.offset(offset))
			if (limit !== -1) queries.push(Query.limit(limit))
			if (orderType !== null) queries.push(orderType === 'ASC' ? Query.orderAsc('') : Query.orderDesc(''))

			databases.listDocuments<TDocumentGet>(this.databaseId, this.collectionId, queries).then((data) => {
				data.documents.forEach((document) => this.subscribeCollectionUpdate(document, dataStore))
				dataStore.set(data.documents)
				loadingStore.set(false)
			})

			return [dataStore, loadingStore] as const
		}

		createPaginate<TDocumentGet extends Models.Document>(
			limit: number,
			queries: string[] = [],
		): Readonly<
			[
				{
					subscribe: Writable<TDocumentGet[]>['subscribe']
					next: () => void
				},
				Writable<boolean>,
			]
		> {
			const dataStore = writable<TDocumentGet[]>([])
			const loadingStore = writable(true)
			let offset = 0

			const store = {
				subscribe: dataStore.subscribe,
				next: async () => {
					const data = await databases.listDocuments<TDocumentGet>(this.databaseId, this.collectionId, [
						...queries,
						Query.limit(limit),
						Query.offset(offset),
					])
					data.documents.forEach((document) => this.subscribeCollectionUpdate(document, dataStore))

					dataStore.update((current) => [...current, ...data.documents])
					offset += limit
				},
			}

			store.next().then(() => loadingStore.set(false))

			return [store, loadingStore] as const
		}

		createInfinityScrollDispatcher<TDocumentGet extends Models.Document>(
			limit: number,
			queries: string[] = [],
			observerOptions: IntersectionObserverInit = {},
		): Readonly<[Writable<TDocumentGet[]>, (node: HTMLElement) => { destroy(): void }]> {
			const dataStore = writable<TDocumentGet[]>([])
			let lastId: string

			databases.listDocuments<TDocumentGet>(this.databaseId, this.collectionId, [...queries, Query.limit(limit)]).then((firstData) => {
				dataStore.set(firstData.documents)
				firstData.documents.forEach((document) => this.subscribeCollectionUpdate(document, dataStore))
				lastId = firstData.documents[firstData.documents.length - 1].$id
			})

			const observer = new IntersectionObserver((entries, me) => {
				if (lastId === null) return

				entries.forEach((entry) => {
					if (!entry.isIntersecting) return

					databases
						.listDocuments<TDocumentGet>(this.databaseId, this.collectionId, [...queries, Query.limit(limit), Query.cursorAfter(lastId)])
						.then((data) => {
							dataStore.update((current) => {
								current.push(...data.documents)
								lastId = current[current.length - 1].$id
								return current
							})

							data.documents.forEach((document) => this.subscribeCollectionUpdate(document, dataStore))

							entry.target.dispatchEvent(new CustomEvent('fetch', entry.target as CustomEventInit<HTMLElement>))
						})
				})
			}, observerOptions)

			const directive = (node: HTMLElement) => {
				observer.observe(node)

				return {
					destroy() {
						observer.disconnect()
					},
				}
			}

			return [dataStore, directive] as const
		}

		subscribeCollectionUpdate<TDocumentGet>(document: Models.Document, store: Writable<Models.Document[]>): void
		subscribeCollectionUpdate<TDocumentGet>(document: Models.Document, store: Writable<Models.Document>): void
		subscribeCollectionUpdate<TDocumentGet>(
			document: Models.Document,
			store: Writable<Models.Document[]> | Writable<Models.Document>,
		): void {
			client.subscribe(
				`databases.${this.databaseId}.collections.${this.collectionId}.documents.${document.$id}`,
				(response: RealtimeResponseEvent<any>) => {
					if (response.events.includes(`databases.${this.databaseId}.collections.${this.collectionId}.documents.${document.$id}.delete`)) {
						//@ts-ignore
						return store.update((current) => {
							if (Array.isArray(current) === false) return null

							current.splice(current.indexOf(document), 1)
							return current
						})
					}

					if (response.events.includes(`databases.${this.databaseId}.collections.${this.collectionId}.documents.${document.$id}.update`)) {
						return store.update((current) => {
							if (Array.isArray(current) === false) return response.payload
							//@ts-ignore
							current[current.indexOf(document)] = response.payload
							return current
						})
					}
				},
			)
		}
	}

	return Collection
}
