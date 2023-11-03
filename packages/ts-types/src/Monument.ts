import { UserInfo } from './Account'
import { Document, GraphqlDocument } from './Document'
import { Location, LocationForDocument } from './Location'
import { Topic } from './Topic'
import { Transport } from './Transport'

export type Monument = {
	about?: string | null
	userId: string
	location: Location
	name: string
	pictureURL?: URL | undefined | null
	placeDetailId: string
	topics: Topic[]
	transports: Transport[]
}

export type MonumentDocument = Document<Omit<Monument, 'location'> & LocationForDocument>

export type MonumentGraphqlDocument = GraphqlDocument<
	Omit<Monument, 'location'> & LocationForDocument
>

export type MonumentDocumentCreate = Omit<Monument, 'topics' | 'location'> &
	LocationForDocument & { topics?: Topic[] }

export type MonumentMarkerData = GraphqlDocument<Monument>
