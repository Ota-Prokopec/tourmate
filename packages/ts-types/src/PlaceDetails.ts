import { GraphqlDocument } from './Document'
import { Document } from './Document'

export type PlaceDetail = {
	name: string
}

export type PlaceDetailDocument = Document<PlaceDetail>

export type PlaceDetailGraphqlDocument = GraphqlDocument<PlaceDetail>

export type PlaceDetailDocumentCreate = PlaceDetail
