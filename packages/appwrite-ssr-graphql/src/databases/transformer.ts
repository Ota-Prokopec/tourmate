import { Models } from 'node-appwrite'
import * as lodash from 'lodash'
const { omit } = lodash
import { Document, GraphqlDocument, OmitDocument, UserInfoDocument } from '@app/ts-types'
import { appwriteKeys } from './appwriteKeys'

export const transformAppwriteDocumentsIntoGraphqlDocuments = <TDocument extends Models.Document>(...documents: TDocument[]) => {
	return documents.map((document) => ({
		...(omit(document, appwriteKeys) as OmitDocument<TDocument>),
		_id: document.$id,
		_updatedAt: document.$updatedAt,
		_createdAt: document.$createdAt,
		_collectionId: document.$collectionId,
		_permissions: document.$permissions,
		_databaseId: document.$databaseId,
	})) as GraphqlDocument<OmitDocument<TDocument>>[]
}
