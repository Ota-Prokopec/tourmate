import { Document, GraphqlDocument } from './Document'

export type TCheckpointCompletion = {
	userId: string
	monumentId: string
	tourId: string
}

export type TCheckpointCompletionDocument = Document<TCheckpointCompletion>
export type TCheckpointCompletionGraphqlDocument = GraphqlDocument<TCheckpointCompletion>
export type TCheckpointCompletionDocumentCreate = TCheckpointCompletion
