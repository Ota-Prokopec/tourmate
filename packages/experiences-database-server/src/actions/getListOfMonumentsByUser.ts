import appwrite from '@app/appwrite-ssr-experiences'
import { Query } from '@app/appwrite-server'
import { transformMonumentsDocumentsIntoMonuments } from '../transformers'
import { transformAppwriteDocumentsIntoGraphqlDocuments } from '@app/appwrite-nexus'

export const getListOfMonumentsByUser = async (
	{ limit = 100, userId }: { limit?: number; userId: string },
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
) => {
	const MonumentDocuments = await collections.monument.listDocuments([Query.limit(limit), Query.equal('creatorId', userId)])

	const monumentsForGraphql = transformAppwriteDocumentsIntoGraphqlDocuments(
		...transformMonumentsDocumentsIntoMonuments(...MonumentDocuments.documents),
	)

	return monumentsForGraphql
}
