import { Document, GraphqlDocument } from './Document'

export type MonumentLike = {
	monumentId: string
	userId: string
}

export type MonumentLikeDocument = Document<MonumentLike>

export type MonumentLikeDocumentCreate = MonumentLike

export type MonumentLikeGraphqlDocument = GraphqlDocument<MonumentLike>

export type ExperienceLike = {
	experienceId: string
	userId: string
}

export type ExperienceLikeDocument = Document<ExperienceLike>

export type ExperienceLikeDocumentCreate = ExperienceLike

export type ExperienceLikeGraphqlDocument = GraphqlDocument<ExperienceLike>
