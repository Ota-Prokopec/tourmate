import { Document, GraphqlDocument } from './Document'

export type MonumentLike = {
	monumentId: string
	userId: string
}

export type MonumentLikeDocument = Document<MonumentLike>

export type MonumentLikeDocumentCreate = MonumentLike

export type MonumentLikeGraphqlDocument = GraphqlDocument<MonumentLike>
