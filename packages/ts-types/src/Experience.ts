import { Document, GraphqlDocument } from './Document'

export type Location = [number, number]
export const isLocation = (arg: unknown): arg is Location =>
	Array.isArray(arg) && typeof arg[0] === 'number' && typeof arg[1] === 'number' && arg.length === 2

export type Experience = {
	userId: string
	imgSrc: URL
	location: Location
}

export type ExperienceDocument = Document<{
	userId: string
	imgSrc: URL
	latitude: number
	longitude: number
}>

export type ExperienceGraphqlDocument = GraphqlDocument<{
	userId: string
	imgSrc: URL
	latitude: number
	longitude: number
}>

export type ExperienceDocumentCreate = {
	userId: string
	imgSrc: URL
	latitude: number
	longitude: number
}

export type Monument = {
	about?: string | null
	creatorUserId: string
	location: Location
	name: string
	pictureURL?: URL | undefined | null
	placeDetailId: string
}

export type MonumentDocument = Document<{
	about?: string
	creatorUserId: string
	latitude: number
	longitude: number
	name: string
	pictureURL?: URL
	placeDetailId: string
}>

export type MonumentGraphqlDocument = GraphqlDocument<{
	about?: string
	creatorUserId: string
	latitude: number
	longitude: number
	name: string
	pictureURL?: URL
	placeDetailId: string
}>

export type MonumentDocumentCreate = {
	about?: string
	creatorUserId: string
	latitude: number
	longitude: number
	name: string
	pictureURL?: URL
	placeDetailId: string
}

export type PlaceDetails = {
	name: string
}

export type PlaceDetailDocument = Document<PlaceDetails>

export type PlaceDetailGraphqlDocument = GraphqlDocument<PlaceDetails>

export type PlaceDetailDocumentCreate = PlaceDetails
