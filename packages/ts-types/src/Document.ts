import { z } from 'zod'
import { Models } from 'appwrite'

export const appWriteDocumentZod = z.object({
	id: z.string(),
	collectionId: z.string(),
	databaseId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	permissions: z.string().array(),
})

export const appWriteDocumentOptionalZod = z.object({
	id: z.string().optional(),
	collectionId: z.string().optional(),
	databaseId: z.string().optional(),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
	permissions: z.string().array().optional(),
})

export const appwriteDocumentForOmit = {
	id: true,
	collectionId: true,
	databaseId: true,
	createdAt: true,
	updatedAt: true,
	permissions: true,
} as const

export type Document<T extends Partial<Models.Document> & object> = Partial<
	Pick<T, 'id' | 'permissions' | 'collectionId' | 'createdAt' | 'databaseId' | 'updatedAt'>
> &
	Omit<T, 'id' | 'permissions' | 'collectionId' | 'createdAt' | 'databaseId' | 'updatedAt'>

export type ExcludeDocument<T> = Omit<T, 'id' | 'permissions' | 'id' | 'collectionId' | 'createdAt' | 'databaseId' | 'updatedAt'>
export type ExcludeDocumentDeep<T> = ExcludeDocument<{
	[Key in keyof T]: T extends object ? ExcludeDocumentDeep<T[Key]> : T[Key]
}>

const emptyObjectZod = z.object({})

export const PartialDocumentDeepZod = (document: typeof emptyObjectZod) => {
	return document
}

export const PartialDocumentDdeepZod = (document: typeof emptyObjectZod) => {
	return document.deepPartial()
}
