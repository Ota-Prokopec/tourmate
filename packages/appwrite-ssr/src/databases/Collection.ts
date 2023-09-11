import * as permissionslib from '@app/appwrite-permissions'
import { DatabaseValueTypes, OmitDocument } from '@app/ts-types'
import { Client, Databases, ID, Models, Query } from 'appwrite'

const isArrayString = (permissions: unknown[]): permissions is string[] => {
	return permissions.every((permission) => typeof permission === 'string')
}

const convertObjectInfoArray = (data: Record<string, string>): string[] => {
	return Object.values(data)
}

export default (client: Client) => {
	const databases = new Databases(client)

	return class Collection<TDocumentGet extends Models.Document, TDocumentCreate extends Record<string, DatabaseValueTypes>> {
		constructor(public databaseId: string, public collectionId: string) {
			this.databaseId = databaseId
			this.collectionId = collectionId
		}

		//create document with node-appwrite
		createDocument(data: TDocumentCreate, permissions?: Models.User<Models.Preferences>[], id?: string): Promise<TDocumentGet>
		createDocument(data: TDocumentCreate, permissions?: string[], id?: string): Promise<TDocumentGet>
		createDocument(
			data: TDocumentCreate,
			permissions: string[] | undefined | Models.User<Models.Preferences>[] = undefined,
			id: string = ID.unique(),
		): Promise<TDocumentGet> {
			try {
				if ((permissions && isArrayString(permissions)) || !permissions) {
					//@ts-ignore
					return databases.createDocument(this.databaseId, this.collectionId, id, data, permissions)
				} else
					return databases.createDocument(
						this.databaseId,
						this.collectionId,
						id,
						//@ts-ignore

						data,
						permissionslib.owner(...permissions.map((user) => user.$id)),
					)
			} catch (error) {
				console.log(`Error:${error} databaseId: ${this.databaseId} collectionId: ${this.collectionId}`)
				throw error
			}
		}

		//update document with node-appwrite
		updateDocument<TData extends TDocumentGet>(
			documentId: string | Models.Document,
			data: OmitDocument<TDocumentGet> | undefined | {},
			permissions: string[] | undefined = undefined,
		) {
			if (!Array.isArray(permissions) && permissions) permissions = convertObjectInfoArray(permissions)
			return databases.updateDocument<TData>(
				this.databaseId,
				this.collectionId,
				typeof documentId === 'string' ? documentId : documentId.$id,
				data ?? {},
				permissions,
			)
		}

		//update document with node-appwrite
		updatePermissions<TData extends TDocumentGet>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet>
		updatePermissions<TData extends TDocumentGet>(document: Models.Document, permissions: string[] | undefined): Promise<TDocumentGet>
		updatePermissions<TData extends TDocumentGet>(
			documentId: string | Models.Document,
			permissions: string[] | undefined = undefined,
		): Promise<TDocumentGet> {
			if (!Array.isArray(permissions) && permissions) permissions = convertObjectInfoArray(permissions)
			return databases.updateDocument(
				this.databaseId,
				this.collectionId,
				typeof documentId === 'string' ? documentId : documentId.$id,
				{},
				permissions,
			)
		}

		//delete document with node-appwrite
		async deleteDocument(filters: string[]): Promise<string>
		async deleteDocument(document: TDocumentGet): Promise<string>
		async deleteDocument(documentId: string): Promise<string>
		async deleteDocument(param: string | TDocumentGet | string[]) {
			//	console.log(Array.isArray(param) && isArrayString(param))

			if (typeof param === 'string') {
				return databases.deleteDocument(this.databaseId, this.collectionId, param)
			} else if (Array.isArray(param) && isArrayString(param)) {
				const document = await this.getDocument(param)
				return await this.deleteDocument(document.$id)
			} //else if ((param as TDocumentGet) && !Array.isArray(param)) {
			return databases.deleteDocument(this.databaseId, this.collectionId, param.$id)
		}

		//delete documents with node-appwrite
		async deleteDocuments(filters?: string[]): Promise<string[]> {
			const { documents } = await this.listDocuments(filters)
			if (documents.length === 0) throw new TypeError('No document found to delete')
			return await Promise.all(documents.map((document) => this.deleteDocument(document.$id)))
		}

		//get document with node-appwrite
		async getDocument(documentId: string): Promise<TDocumentGet>
		async getDocument(queries: string[]): Promise<TDocumentGet>
		async getDocument(params: string | string[]): Promise<TDocumentGet> {
			let data: TDocumentGet
			if (typeof params === 'string') {
				data = await databases.getDocument<TDocumentGet>(this.databaseId, this.collectionId, params)
			} else {
				const list = await this.listDocuments<TDocumentGet>(params)

				if (list.total < 1)
					if (list.total > 1)
						//throw new Error("Document that matches the query not found");
						throw new Error('Multiple documents found, use listDocuments instead or try to be more specific in your query')
				data = list.documents[0]
			}
			if (typeof data?.$permissions === 'object' && !Array.isArray(data?.$permissions))
				data.$permissions = convertObjectInfoArray(data.$permissions)

			return data
		}

		//list documents with node-appwrite
		async listDocuments<TData extends TDocumentGet>(
			filters: string[] = [],
			offset = 0,
			limit = -1,
			orderType: 'ASC' | 'DESC' | null = null,
		) {
			if (Number.isInteger(offset) === false) throw new TypeError('offset must be a non-negative integer')
			if (offset < 0) throw new TypeError('limit must be a non-negative integer')
			if (Number.isInteger(limit) === false) throw new TypeError('limit must be a non-negative integer or -1')
			if (limit < -1) throw new TypeError('limit must be a non-negative integer or -1')
			if (filters.some((filter) => (filter.includes('[]') ? true : false))) {
				throw new TypeError('filters must include least one item in Query')
			}

			const queries = [...filters]
			if (offset > 0) queries.push(Query.offset(offset))
			if (limit !== -1) queries.push(Query.limit(limit))
			if (orderType !== null) queries.push(orderType === 'ASC' ? Query.orderAsc('') : Query.orderDesc(''))

			const data = await databases.listDocuments<TData>(this.databaseId, this.collectionId, queries)

			data.documents = data.documents.map((document) => ({
				...document,
				$pemissions: Array.isArray(document.$permissions) ? document.$permissions : convertObjectInfoArray(document.$permissions),
			}))
			return data
		}
	}
}
