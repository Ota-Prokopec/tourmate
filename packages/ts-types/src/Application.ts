import { MonumentLike, PlaceDetail, UserInfo } from '.'
import { GraphqlDocument } from './Document'
import { Monument } from './Experience'

export type MonumentCardData = GraphqlDocument<Monument> & {
	placeDetail: PlaceDetail
	creator: UserInfo
	likes: (MonumentLike & { user: UserInfo })[]
}
