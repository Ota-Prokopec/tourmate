import { Document, GraphqlDocument } from './Document'
import { Base64 } from './TsTypes'

export type Location = [number, number]
export const isLocation = (arg: unknown[]): arg is Location => typeof arg[0] === 'number' && typeof arg[1] === 'number' && arg.length === 2

export type Experience = {
	userId: string
	imgSrc: string | Base64
	location: Location
}

export type ExperienceDocument = Document<{
	userId: string
	imgSrc: string | Base64
	latitude: number
	longitude: number
}>

export type ExperienceGraphqlDocument = GraphqlDocument<{
	userId: string
	imgSrc: string | Base64
	latitude: number
	longitude: number
}>

export type ExperienceDocumentCreate = {
	userId: string
	imgSrc: string | Base64
	latitude: number
	longitude: number
}

export type Monument = {
	about?: string
	creatorUserId: string
	location: Location
	name: string
	pictureURL?: URL
}

export type MonumentDocument = Document<{
	about?: string
	creatorUserId: string
	latitude: number
	longitude: number
	name: string
	pictureURL?: URL
}>

export type MonumentGraphqlDocument = GraphqlDocument<{
	about?: string
	creatorUserId: string
	latitude: number
	longitude: number
	name: string
	pictureURL?: URL
}>

export type MonumentDocumentCreate = {
	about?: string
	creatorUserId: string
	latitude: number
	longitude: number
	name: string
	pictureURL?: URL
}
