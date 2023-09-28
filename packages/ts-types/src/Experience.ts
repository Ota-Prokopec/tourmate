import { Document, GraphqlDocument } from './Document'

export type Location = [number, number]
export const isLocation = (arg: unknown): arg is Location =>
	Array.isArray(arg) && typeof arg[0] === 'number' && typeof arg[1] === 'number' && arg.length === 2

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
