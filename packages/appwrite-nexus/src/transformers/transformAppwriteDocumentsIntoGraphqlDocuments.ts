import { Models } from 'node-appwrite'
import lodash from 'lodash'
const { omit } = lodash
import { appwriteDocumentKeys } from '@app/experience-settings'

export const transformAppwriteDocumentsIntoGraphqlDocuments = <TDocument extends Models.Document>(...documents: TDocument[]) => {
	return documents.map((document) => ({
		...omit(document, appwriteDocumentKeys),
		_id: document.$id,
		_updatedAt: document.$updatedAt,
		_createdAt: document.$createdAt,
		_collectionId: document.$collectionId,
		_permissions: document.$permissions,
		_databaseId: document.$databaseId,
	}))
}
