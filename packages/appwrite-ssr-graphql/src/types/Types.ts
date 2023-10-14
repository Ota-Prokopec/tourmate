import { connections } from '../connection'
import { Document } from '@app/ts-types'

export namespace Types {
	export type Cookie = Record<'name' | 'value', string>
	export type AppwriteSSR = ReturnType<typeof connections>
	export type IndexTypes = 'Key' | 'Unique' | 'FullText'
	export type DocumentSkeleton = {
		_id: string
		_collectionId: string
		_databaseId: string
		_createdAt: string
		_updatedAt: string
		_permissions: string[]
	}

	export type Document<T extends Partial<DocumentSkeleton> & object> = {
		[Key in keyof T]: T[Key] extends Record<string, unknown> ? Document<T[Key]> : T[Key]
	} & DocumentSkeleton
	export type DatabaseValue =
		| string
		| number
		| string[]
		| number[]
		| boolean
		| URL
		| undefined
		| null
		| any[]
		| Record<string, string | number | string[] | number[] | boolean | URL | undefined | null>
}
