import appwrite from '../../../appwrite/appwrite'
import { Query } from '@app/appwrite-server'
import { transformMonumentsDocumentsIntoMonuments } from '../transformers'

export const getListOfMonuments = async (
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
	{ limit }: { limit: number } = { limit: 100 },
) => {
	const MonumentDocuments = await collections.monument.listDocuments([Query.limit(limit)])

	return transformMonumentsDocumentsIntoMonuments(...MonumentDocuments.documents)
}
