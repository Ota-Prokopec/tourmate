import { Document, GraphqlDocument } from './Document'

export type PictureEdit = Partial<{
	textStyles?: string[]
	texts?: string[]
}>

export type PictureEditDocument = Document<{
	textStyles?: string[]
	texts?: string[]
}>

export type PictureEditDocumentCreate =
	| {
			textStyles?: string[]
			texts?: string[]
	  }
	| undefined

export type PictureEditGraphqlDocument = GraphqlDocument<{
	textStyles?: string[]
	texts?: string[]
}>
