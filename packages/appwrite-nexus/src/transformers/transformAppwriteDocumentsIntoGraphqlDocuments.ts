import { Models } from 'node-appwrite'
import lodash from 'lodash'
import { appwriteDocumentKeys } from '@app/appwrite-server'
const { omit } = lodash

export const transformAppwriteDocumentsIntoGraphqlDocuments = <TDocument extends Models.Document>(...documents: TDocument[]) => {
	return documents.map((document) => ({
		...omit(document, appwriteDocumentKeys),
		id: document.$id,
		updatedAt: document.$updatedAt,
		createdAt: document.$createdAt,
		collectionId: document.$collectionId,
		permissions: document.$permissions,
		databaseId: document.$databaseId,
	}))
}
