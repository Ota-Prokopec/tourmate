import { UserInfo } from './Account'
import { Document, GraphqlDocument } from './Document'
import { Location } from './Location'

export type Experience = {
	userId: string
	imgSrc: URL
	location: Location
	placeDetailId: string
}

export type ExperienceDocument = Document<{
	userId: string
	imgSrc: URL
	latitude: number
	longitude: number
	placeDetailId: string
}>

export type ExperienceGraphqlDocument = GraphqlDocument<{
	userId: string
	imgSrc: URL
	latitude: number
	longitude: number
	placeDetailId: string
}>

export type ExperienceDocumentCreate = {
	userId: string
	imgSrc: URL
	latitude: number
	longitude: number
	placeDetailId: string
}

export type ExperienceMarkerData = GraphqlDocument<Experience> & { user: UserInfo }
