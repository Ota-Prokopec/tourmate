import { Document, GraphqlDocument } from './Document'
import { Location } from './Location'

export type LocationForNotifications = {
	userId: string
	location: Location
}
export type LocationForNotificationsDocumentCreate = {
	userId: string
	latitude: number
	longitude: number
}
export type LocationForNotificationsDocument =
	Document<LocationForNotificationsDocumentCreate>
export type LocationForNotificationsGraphqlDocument =
	GraphqlDocument<LocationForNotificationsDocumentCreate>
