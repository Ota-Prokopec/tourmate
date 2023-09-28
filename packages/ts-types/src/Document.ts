import { Models } from 'appwrite'

export type DocumentSkeleton = Models.Document

export type Document<T extends Partial<Models.Document> & object> = {
	[Key in keyof T]: T[Key] extends Record<string, unknown> ? Document<T[Key]> : T[Key]
} & DocumentSkeleton

type S = {
	name: string
	location: [number, number]
}

type Test = Document<S>

export type OmitDocument<T> = Omit<T, '$permissions' | '$id' | '$collectionId' | '$createdAt' | '$databaseId' | '$updatedAt'>
export type OmitDocumentDeep<T> = OmitDocument<{
	[Key in keyof T]: T extends object ? OmitDocumentDeep<T[Key]> : T[Key]
}>

// Graphql
export type GraphqlDocumentSkeleton = {
	_id: string
	_updatedAt: string
	_createdAt: string
	_collectionId: string
	_databaseId: string
	_permissions: string[]
}

export type GraphqlDocument<T extends Partial<GraphqlDocumentSkeleton> & object> = {
	[Key in keyof T]: T[Key] extends Record<string, unknown> ? GraphqlDocument<T[Key]> : T[Key]
} & GraphqlDocumentSkeleton

export type AppwriteDocToGraphqlDoc<T extends Models.Document> = GraphqlDocument<OmitDocument<T>>
