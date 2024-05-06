import { Document, GraphqlDocument } from './Document'

export type TTourCheckpointCompletion = {
	userId: string
	monumentId: string
	tourId: string
}

export type TTourCheckpointCompletionDocument = Document<TTourCheckpointCompletion>
export type TTourCheckpointCompletionGraphqlDocument =
	GraphqlDocument<TTourCheckpointCompletion>
export type TTourCheckpointCompletionDocumentCreate = TTourCheckpointCompletion
