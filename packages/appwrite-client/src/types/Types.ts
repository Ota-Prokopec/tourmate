import connection from '../connection/connection'

export namespace Types {
	export type Appwrite = ReturnType<typeof connection>
	export type IndexTypes = 'Key' | 'Unique' | 'FullText'
	export type DocumentSkeleton = {
		$id: string
		$collectionId: string
		$databaseId: string
		$createdAt: string
		$updatedAt: string
		$permissions: string[]
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
		| Record<
				string,
				string | number | string[] | number[] | boolean | URL | undefined | null
		  >
}
