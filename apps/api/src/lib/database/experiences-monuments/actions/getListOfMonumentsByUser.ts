import appwrite from '../../../appwrite/appwrite'
import { Query } from '@app/appwrite-server'
import { transformMonumentsDocumentsIntoMonuments } from '../transformers'

export const getListOfMonumentsByUser = async (
	{ limit = 100, userId }: { limit?: number; userId: string },
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
) => {
	const MonumentDocuments = await collections.monument.listDocuments([Query.limit(limit), Query.equal('creatorUserId', userId)])

	return transformMonumentsDocumentsIntoMonuments(...MonumentDocuments.documents)
}
