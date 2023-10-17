import { Document, GraphqlDocument } from './Document'
import { Topic } from './Topic'

export type Location = [number, number]

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

export type Monument = {
	about?: string | null
	creatorUserId: string
	location: Location
	name: string
	pictureURL?: URL | undefined | null
	placeDetailId: string
	topic?: Topic
}
