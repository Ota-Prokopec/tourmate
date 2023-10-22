import { Document, GraphqlDocument } from './Document'
import { Location } from './Location'
import { Topic } from './Topic'

export type Monument = {
	about?: string | null
	creatorUserId: string
	location: Location
	name: string
	pictureURL?: URL | undefined | null
	placeDetailId: string
	topics: Topic[]
}

export type MonumentDocument = Document<{
	about?: string
	creatorUserId: string
	latitude: number
	longitude: number
	name: string
	pictureURL?: URL
	placeDetailId: string
	topics: Topic[]
}>

export type MonumentGraphqlDocument = GraphqlDocument<{
	about?: string
	creatorUserId: string
	latitude: number
	longitude: number
	name: string
	pictureURL?: URL
	placeDetailId: string
	topics: Topic[]
}>

export type MonumentDocumentCreate = {
	about?: string
	creatorUserId: string
	latitude: number
	longitude: number
	name: string
	pictureURL?: URL
	placeDetailId: string
	topics?: Topic[]
}
