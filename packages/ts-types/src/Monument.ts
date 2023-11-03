import { Document, GraphqlDocument } from './Document'
import { Location } from './Location'
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

export type MonumentDocument = Document<Monument>

export type MonumentGraphqlDocument = GraphqlDocument<Monument>

export type MonumentDocumentCreate = Omit<Monument, 'topics'> & { topics?: Topic[] }
