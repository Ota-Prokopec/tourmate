import { GraphqlDocumentSkeleton } from '@app/ts-types'
import { connections } from '../connections'

export namespace Types {
	export type Cookie = Record<'name' | 'value', string>
	export type AppwriteSSR = ReturnType<typeof connections.setCookie>
	export type Document = GraphqlDocumentSkeleton
}
