import permissionslib from '../permissions/permissions'
import { Client, Databases, ID, Models, Query } from 'appwrite'
import { transformAppwriteDocumentsIntoGraphqlDocuments } from '@app/appwrite-nexus'
import { Types } from '../types/Types'
import { OmitDocument } from '@app/ts-types'

type Document = Types.Document

type DatabaseValueTypes = string | number | string[] | number[] | boolean | URL

const isArrayString = (permissions: unknown[]): permissions is string[] => {
	return permissions.every((permission) => typeof permission === 'string')
}

const convertObjectInfoArray = (data: Record<string, string>): string[] => {
	return Object.values(data)
}

const atg =
	<Type extends Document>() =>
	(...documents: Models.Document[]) =>
		transformAppwriteDocumentsIntoGraphqlDocuments(...documents) as unknown as Type[]

const atgDocumentList =
	<Type extends Document>() =>
	(documentList: Models.DocumentList<Models.Document>) =>
		({ total: documentList.total, documents: transformAppwriteDocumentsIntoGraphqlDocuments(...documentList.documents) } as unknown as {
			total: number
			documents: Type[]
		})

export default (client: Client) => {
	const databases = new Databases(client)

	return class Collection<TDocumentGet extends Document, TDocumentCreate extends Record<string, DatabaseValueTypes>> {
		public atg
		public atgDocumentList
		constructor(public databaseId: string, public collectionId: string) {
			this.databaseId = databaseId
			this.collectionId = collectionId
			this.atg = atg<TDocumentGet>()
			this.atgDocumentList = atgDocumentList<TDocumentGet>()
		}

		//create document with node-appwrite
		async createDocument(data: TDocumentCreate, permissions?: Models.User<Models.Preferences>[], id?: string): Promise<TDocumentGet>
		async createDocument(data: TDocumentCreate, permissions?: string[], id?: string): Promise<TDocumentGet>
		async createDocument(
			data: TDocumentCreate,
			permissions: string[] | undefined | Models.User<Models.Preferences>[] = undefined,
			id: string = ID.unique(),
		): Promise<TDocumentGet> {
			try {
				if ((permissions && isArrayString(permissions)) || !permissions) {
					return this.atg(await databases.createDocument(this.databaseId, this.collectionId, id, data, permissions))[0]
				} else
					return this.atg(
						await databases.createDocument(
							this.databaseId,
							this.collectionId,
							id,
							data,
							permissionslib.owner(...permissions.map((user) => user.$id)),
						),
					)[0]
			} catch (error) {
				console.log(`Error:${error} databaseId: ${this.databaseId} collectionId: ${this.collectionId}`)
				throw error
			}
		}

		//update document with node-appwrite
		async updateDocument<TData extends TDocumentGet>(
			documentId: string,
			data: OmitDocument<TDocumentGet> | undefined | {},
			permissions: string[] | undefined,
		): Promise<TDocumentGet>
		async updateDocument<TData extends TDocumentGet>(
			document: Document,
			data: OmitDocument<TDocumentGet> | undefined | {},
			permissions: string[] | undefined,
		): Promise<TDocumentGet>
		async updateDocument<TData extends TDocumentGet>(
			param: string | Document,
			data: OmitDocument<TDocumentGet> | undefined | {},
			permissions: string[] | undefined = undefined,
		): Promise<TDocumentGet> {
			if (!Array.isArray(permissions) && permissions) permissions = convertObjectInfoArray(permissions)
			return this.atg(
				await databases.updateDocument(
					this.databaseId,
					this.collectionId,
					typeof param === 'string' ? param : param._id,
					data ?? {},
					permissions,
				),
			)[0]
		}

		//update document with node-appwrite
		async updatePermissions<TData extends TDocumentGet>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet>
		async updatePermissions<TData extends TDocumentGet>(document: Document, permissions: string[] | undefined): Promise<TDocumentGet>
		async updatePermissions<TData extends TDocumentGet>(
			documentId: string | Document,
			permissions: string[] | undefined = undefined,
		): Promise<TDocumentGet> {
			if (!Array.isArray(permissions) && permissions) permissions = convertObjectInfoArray(permissions)
			return this.atg(
				await databases.updateDocument(
					this.databaseId,
					this.collectionId,
					typeof documentId === 'string' ? documentId : documentId._id,
					{},
					permissions,
				),
			)[0]
		}

		//delete document with node-appwrite
		async deleteDocument(filters: string[]): Promise<string>
		async deleteDocument(document: TDocumentGet): Promise<string>
		async deleteDocument(documentId: string): Promise<string>
		async deleteDocument(param: string | TDocumentGet | string[]) {
			if (typeof param === 'string') {
				return databases.deleteDocument(this.databaseId, this.collectionId, param)
			} else if (Array.isArray(param) && isArrayString(param)) {
				const document = await this.getDocument(param)
				return await this.deleteDocument(document._id)
			} //else if ((param as TDocumentGet) && !Array.isArray(param)) {
			return databases.deleteDocument(this.databaseId, this.collectionId, param._id)
		}

		//delete documents with node-appwrite
		async deleteDocuments(filters?: string[]): Promise<string[]> {
			const { documents } = await this.listDocuments(filters)
			if (documents.length === 0) throw new TypeError('No document found to delete')
			return await Promise.all(documents.map((document) => this.deleteDocument(document._id)))
		}

		//get document with node-appwrite
		async getDocument(documentId: string): Promise<TDocumentGet>
		async getDocument(queries: string[]): Promise<TDocumentGet>
		async getDocument(params: string | string[]): Promise<TDocumentGet> {
			let data: TDocumentGet
			if (typeof params === 'string') {
				data = await this.atg(await databases.getDocument(this.databaseId, this.collectionId, params))[0]
			} else {
				const list = await this.listDocuments(params)

				if (list.total < 1)
					if (list.total > 1)
						//throw new Error("Document that matches the query not found");
						throw new Error('Multiple documents found, use listDocuments instead or try to be more specific in your query')
				data = list.documents[0]
			}
			if (typeof data?._permissions === 'object' && !Array.isArray(data?._permissions))
				data._permissions = convertObjectInfoArray(data._permissions)

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

			const data = this.atgDocumentList(await databases.listDocuments(this.databaseId, this.collectionId, queries))

			data.documents = data.documents.map((document) => ({
				...document,
				$pemissions: Array.isArray(document._permissions) ? document._permissions : convertObjectInfoArray(document._permissions),
			}))
			return data
		}
	}
}
