import { UserInfo } from './Account'
import { Document, GraphqlDocument } from './Document'
import { Location, LocationForDocument } from './Location'

export type Experience = {
	userId: string
	imgSrc: URL
	location: Location
	placeDetailId: string
	connectedMonumentId: string
}

export type ExperienceDocument = Document<
	Omit<Experience, 'location'> & LocationForDocument
>

export type ExperienceGraphqlDocument = GraphqlDocument<
	Omit<Experience, 'location'> & LocationForDocument
>

export type ExperienceDocumentCreate = Omit<Experience, 'location'> & LocationForDocument

export type ExperienceMarkerData = GraphqlDocument<Experience> & { user: UserInfo }
