import { Models } from 'appwrite'
import { transformAppwriteDocumentsIntoGraphqlDocuments } from './transformer'
import { Types } from '../types/Types'

export const transformAppwriteToGraphql =
	<Type extends Types.Document<{}>>() =>
	(...documents: Models.Document[]) =>
		transformAppwriteDocumentsIntoGraphqlDocuments(...documents) as unknown as Type[]

export const transformAppwriteToGraphqlDocumentList =
	<Type extends Types.Document<{}>>() =>
	(documentList: Models.DocumentList<Models.Document>) =>
		({ total: documentList.total, documents: transformAppwriteDocumentsIntoGraphqlDocuments(...documentList.documents) } as unknown as {
			total: number
			documents: Type[]
		})
