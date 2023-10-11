import { Document, GraphqlDocument } from './Document'

export type MonumentLike = {
	monumentId: string
	userId: string
}

export type MonumentLikeDocument = Document<{
	monumentId: string
	userId: string
}>

export type MonumentLikeDocumentCreate = {
	monumentId: string
	userId: string
}

export type MonumentLikeGraphqlDocument = GraphqlDocument<{
	monumentId: string
	userId: string
}>

export type ExperienceLike = {
	monumentId: string
	userId: string
}

export type ExperienceLikeDocument = Document<{
	monumentId: string
	userId: string
}>

export type ExperienceLikeDocumentCreate = {
	monumentId: string
	userId: string
}

export type ExperienceLikeGraphqlDocument = GraphqlDocument<{
	experienceId: string
	userId: string
}>
