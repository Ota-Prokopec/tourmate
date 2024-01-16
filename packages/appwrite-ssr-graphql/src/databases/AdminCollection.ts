import * as permissionslib from '@app/appwrite-permissions'
import { Client, Databases, ID, Models, Query } from 'node-appwrite'
import { Types } from '../types/Types'
import {
	transformAppwriteToGraphql,
	transformAppwriteToGraphqlDocumentList,
} from './transformAppwriteToGraphql'
import { EmptyObject } from 'type-fest'

type Document = Types.Document<{}>

const isArrayString = (permissions: unknown[]): permissions is string[] => {
	return permissions.every((permission) => typeof permission === 'string')
}

const convertObjectInfoArray = (data: Record<string, string>): string[] => {
	return Object.values(data)
}

export default (client: Client) => {
	const databases = new Databases(client)

	return class Collection<
		TDocumentGet extends Document,
		TDocumentCreate extends Record<string, Types.DatabaseValue>,
	> {
		public atg
		public atgDocumentList
		constructor(public databaseId: string, public collectionId: string) {
			this.databaseId = databaseId
			this.collectionId = collectionId
			this.atg = transformAppwriteToGraphql<TDocumentGet>()
			this.atgDocumentList = transformAppwriteToGraphqlDocumentList<TDocumentGet>()
		}

		//create document with node-appwrite
		async createDocument(
			data: TDocumentCreate,
			permissions?: Models.User<{}>[],
			id?: string,
		): Promise<TDocumentGet>
		async createDocument(
			data: TDocumentCreate,
			permissions?: string[],
			id?: string,
		): Promise<TDocumentGet>
		async createDocument(
			data: TDocumentCreate,
			permissions: string[] | undefined | Models.User<{}>[] = undefined,
			id: string = ID.unique(),
		): Promise<TDocumentGet> {
			try {
				if ((permissions && isArrayString(permissions)) || !permissions) {
					const res = this.atg(
						await databases.createDocument(
							this.databaseId,
							this.collectionId,
							id,
							data,
							permissions,
						),
					)[0]
					if (!res) throw new Error('Document has not been created')
					return res
				} else {
					const res = this.atg(
						await databases.createDocument(
							this.databaseId,
							this.collectionId,
							id,
							data,
							permissionslib.owner(...permissions.map((user) => user.$id)),
						),
					)[0]
					if (!res) throw new Error('Document has not been created')
					return res
				}
			} catch (error) {
				console.log(
					`Error:${error} databaseId: ${this.databaseId} collectionId: ${this.collectionId}`,
				)
				throw error
			}
		}

		//update document with node-appwrite

		async updateDocument<TData extends TDocumentGet>(
			documentId: string,
			data: Partial<TDocumentCreate> | EmptyObject | undefined,
			permissions: string[] | undefined,
		): Promise<TDocumentGet>
		async updateDocument<TData extends TDocumentGet>(
			document: Document,
			data: Partial<TDocumentCreate> | EmptyObject | undefined,
			permissions: string[] | undefined,
		): Promise<TDocumentGet>
		async updateDocument<TData extends TDocumentGet>(
			param: string | Document,
			data: Partial<TDocumentCreate> | EmptyObject | undefined,
			permissions: string[] | undefined = undefined,
		): Promise<TDocumentGet> {
			if (!Array.isArray(permissions) && permissions)
				permissions = convertObjectInfoArray(permissions)
			const res = this.atg(
				await databases.updateDocument(
					this.databaseId,
					this.collectionId,
					typeof param === 'string' ? param : param._id,
					data ?? {},
					permissions,
				),
			)[0]
			if (!res) throw new Error('Document was not updated')
			return res
		}

		//update document with node-appwrite
		async updatePermissions<TData extends TDocumentGet>(
			documentId: string,
			permissions: string[] | undefined,
		): Promise<TDocumentGet>
		async updatePermissions<TData extends TDocumentGet>(
			document: Document,
			permissions: string[] | undefined,
		): Promise<TDocumentGet>
		async updatePermissions<TData extends TDocumentGet>(
			documentId: string | Document,
			permissions: string[] | undefined = undefined,
		): Promise<TDocumentGet> {
			if (!Array.isArray(permissions) && permissions)
				permissions = convertObjectInfoArray(permissions)
			const res = this.atg(
				await databases.updateDocument(
					this.databaseId,
					this.collectionId,
					typeof documentId === 'string' ? documentId : documentId._id,
					{},
					permissions,
				),
			)[0]
			if (!res) throw new Error('Permissions were no updated')
			return res
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
				if (!document)
					throw new Error(
						'document that is requeste was not found, check permissions first',
					)
				return await this.deleteDocument(document._id)
			} //else if ((param as TDocumentGet) && !Array.isArray(param)) {
			return databases.deleteDocument(this.databaseId, this.collectionId, param._id)
		}

		//delete documents with node-appwrite
		async deleteDocuments(filters?: string[]): Promise<string[]> {
			const { documents } = await this.listDocuments(filters)
			if (documents.length === 0) throw new TypeError('No document found to delete')
			return await Promise.all(
				documents.map((document) => this.deleteDocument(document._id)),
			)
		}

		//get document with node-appwrite
		async getDocument(documentId: string): Promise<TDocumentGet | null>
		async getDocument(queries: string[]): Promise<TDocumentGet | null>
		async getDocument(params: string | string[]): Promise<TDocumentGet | null> {
			let data: TDocumentGet | null
			if (typeof params === 'string') {
				try {
					data =
						(await this.atg(
							await databases.getDocument(this.databaseId, this.collectionId, params),
						)[0]) ?? null
				} catch (error) {
					data = null
				}
			} else {
				const list = await this.listDocuments(params)

				if (list.total > 1)
					throw new Error(
						'Multiple documents found, use listDocuments instead or try to be more specific in your query',
					)
				data = list.documents[0] || null
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
			if (Number.isInteger(offset) === false)
				throw new TypeError('offset must be a non-negative integer')
			if (offset < 0) throw new TypeError('limit must be a non-negative integer')
			if (Number.isInteger(limit) === false)
				throw new TypeError('limit must be a non-negative integer or -1')
			if (limit < -1) throw new TypeError('limit must be a non-negative integer or -1')
			if (filters.some((filter) => (filter.includes('[]') ? true : false))) {
				throw new TypeError('filters must include least one item in Query')
			}

			const queries = [...filters]
			if (offset > 0) queries.push(Query.offset(offset))
			if (limit !== -1) queries.push(Query.limit(limit))
			if (orderType !== null)
				queries.push(orderType === 'ASC' ? Query.orderAsc('') : Query.orderDesc(''))

			const data = this.atgDocumentList(
				await databases.listDocuments(this.databaseId, this.collectionId, queries),
			)

			data.documents = data.documents.map((document) => ({
				...document,
				_pemissions: Array.isArray(document._permissions)
					? document._permissions
					: convertObjectInfoArray(document._permissions),
			}))
			return data
		}
		delete() {
			return databases.delete(this.databaseId)
		}
		listCollections() {
			return databases.listCollections(this.databaseId)
		}
		list() {
			return databases.list()
		}

		create(name: string) {
			return databases.create(this.databaseId, name)
		}
		get() {
			return databases.get(this.databaseId)
		}
		update(name: string) {
			return databases.update(this.databaseId, name)
		}
		createCollection(collectionId: string, collectionName: string) {
			return databases.createCollection(this.databaseId, collectionId, collectionName)
		}

		getCollection(collectionId: string) {
			return databases.getCollection(this.databaseId, collectionId)
		}
		updateCollection(collectionId: string, collectionName: string) {
			return databases.updateCollection(this.databaseId, collectionId, collectionName)
		}
		deleteCollection(collectionId: string) {
			return databases.deleteCollection(this.databaseId, collectionId)
		}
		listAttributes(collectionId: string) {
			return databases.listAttributes(this.databaseId, collectionId)
		}
		//createAttribute(
		// 	attributeName: 'Boolean' | 'Datetime' | 'Email' | 'Enum' | 'Float' | 'Integer' | 'Ip' | 'Relationship' | 'Url' | 'String',
		// 	key: string,
		// 	required: boolean,
		// 	xdefault?: boolean | undefined,
		// 	array?: boolean | undefined,
		// ) {
		// 	return databases[`create${attributeName}Attribute`](this.databaseId, this.collectionId, key, required, xdefault, array) as Promise<
		// 		| Models.AttributeString
		// 		| Models.AttributeBoolean
		// 		| Models.AttributeDatetime
		// 		| Models.AttributeEmail
		// 		| Models.AttributeEnum
		// 		| Models.AttributeFloat
		// 		| Models.AttributeInteger
		// 		| Models.AttributeIp
		// 		| Models.AttributeList
		// 		| Models.AttributeRelationship
		// 		| Models.AttributeUrl
		// 	>
		// }

		getAttribute(attributeName: keyof TDocumentGet) {
			return databases.getAttribute(
				this.databaseId,
				this.collectionId,
				attributeName.toString(),
			)
		}
		deleteAttribute(attributeName: keyof TDocumentGet) {
			return databases.deleteAttribute(
				this.databaseId,
				this.collectionId,
				attributeName.toString(),
			)
		}
		updateRelationship(relationshipAttribute: keyof TDocumentGet) {
			return databases.updateRelationshipAttribute(
				this.databaseId,
				this.collectionId,
				relationshipAttribute.toString(),
			)
		}
		listIndexes() {
			return databases.listIndexes(this.databaseId, this.collectionId)
		}
		createIndex(key: string, type: Types.IndexTypes, attributes: (keyof TDocumentGet)[]) {
			return databases.createIndex(
				this.databaseId,
				this.collectionId,
				key,
				type,
				attributes.map((att) => attributes.toString()),
			)
		}
		getIndex(key: string) {
			return databases.getIndex(this.databaseId, this.collectionId, key)
		}
		deleteIndex(key: string) {
			return databases.deleteIndex(this.databaseId, this.collectionId, key)
		}
	}
}
