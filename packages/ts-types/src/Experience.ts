import { UserInfo } from './Account'
import { Document, GraphqlDocument } from './Document'
import { Location, LocationForDocument } from './Location'

export type Experience = {
	userId: string
	pictureUrl?: (URL & string) | string | null | undefined
	location: Location
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
