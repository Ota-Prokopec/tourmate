import { UserInfo } from './Account'
import { Document, GraphqlDocument } from './Document'

export type TMonumentCompletion = {
	userId: string
	monumentId: string
}

export type TMonumentCompletionDocument = Document<TMonumentCompletion>

export type TMonumentCompletionGraphqlDocument = GraphqlDocument<TMonumentCompletion>

export type TMonumentCompletionDocumentCreate = TMonumentCompletion

export type TMonumentCompletionMarkerData = GraphqlDocument<TMonumentCompletion> & {
	user: UserInfo
}
