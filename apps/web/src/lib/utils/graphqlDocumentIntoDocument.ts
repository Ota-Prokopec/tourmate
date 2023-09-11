import { appwriteGraphqlDocumentKeys } from '@app/appwrite-ssr-experiences';
import { GraphqlDocument } from '@app/ts-types';
import lodash from 'lodash';
const { omit } = lodash;

export const graphqlDocumentsIntoDocuments = <TInput extends GraphqlDocument<Record<string, any>>>(
	...graphqlDocs: TInput[]
) => {
	return graphqlDocs.map((graphqlDoc) => ({
		...omit(graphqlDoc, appwriteGraphqlDocumentKeys),
		...{
			$id: graphqlDoc._id,
			$createdAt: graphqlDoc._createdAt,
			$collectionId: graphqlDoc._collectionId,
			$databaseId: graphqlDoc._databaseId,
			$permissions: graphqlDoc._permissions,
			$updatedAt: graphqlDoc._updatedAt
		}
	}));
};
