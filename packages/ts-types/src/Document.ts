import { z } from 'zod'
import { Models } from 'appwrite'

export const appWriteDocumentZod = z.object({
	$id: z.string(),
	$collectionId: z.string(),
	$databaseId: z.string(),
	$createdAt: z.string(),
	$updatedAt: z.string(),
	$permissions: z.string().array(),
})

export const appWriteDocumentOptionalZod = z.object({
	$id: z.string().optional(),
	$collectionId: z.string().optional(),
	$databaseId: z.string().optional(),
	$createdAt: z.string().optional(),
	$updatedAt: z.string().optional(),
	$permissions: z.string().array().optional(),
})

export const appwriteDocumentForOmit = {
	$id: true,
	$collectionId: true,
	$databaseId: true,
	$createdAt: true,
	$updatedAt: true,
	$permissions: true,
} as const

export type DocumentSkeleton = Models.Document

export type Document<T extends Partial<Models.Document> & object> = T & DocumentSkeleton

export type OmitDocument<T> = Omit<T, '$permissions' | '$id' | '$collectionId' | '$createdAt' | '$databaseId' | '$updatedAt'>
export type OmitDocumentDeep<T> = OmitDocument<{
	[Key in keyof T]: T extends object ? OmitDocumentDeep<T[Key]> : T[Key]
}>

const emptyObjectZod = z.object({})

export const PartialDocumentDeepZod = (document: typeof emptyObjectZod) => {
	return document
}

export const PartialDocumentDdeepZod = (document: typeof emptyObjectZod) => {
	return document.deepPartial()
}

export type GraphqlDocumentSkeleton = {
	_id: string
	_updatedAt: string
	_createdAt: string
	_collectionId: string
	_databaseId: string
	_permissions: string[]
}

export type GraphqlDocument<T extends Partial<GraphqlDocumentSkeleton> & object> = T & GraphqlDocumentSkeleton

export type AppwriteDocToGraphqlDoc<T extends Models.Document> = GraphqlDocument<OmitDocument<T>>
