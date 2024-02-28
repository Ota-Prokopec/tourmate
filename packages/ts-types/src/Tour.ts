import { UserInfo } from './Account'
import { MonumentCard } from './Card'
import { Document, GraphqlDocument } from './Document'

export type Tour = {
	userId: string
	user: UserInfo
	monuments: MonumentCard[]
	tourName: string
}

export type TourDocument = Document<
	Omit<Tour, 'monuments' | 'user'> & { monumentIds: string[] }
>
export type TourGraphqlDocument = GraphqlDocument<
	Omit<Tour, 'monuments' | 'user'> & { monumentIds: string[] }
>
export type TourDocumentCreate = Omit<Tour, 'monuments' | 'user'> & {
	monumentIds: string[]
}
