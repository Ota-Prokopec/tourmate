import appwrite from '@app/appwrite-ssr-experiences-graphql'
import { Query } from '@app/appwrite-server'
import { transformMonumentsDocumentsIntoMonuments } from '../transformers'
import { transformAppwriteDocumentsIntoGraphqlDocuments } from '@app/appwrite-nexus'

export const getListOfMonuments = async (
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
	{ limit }: { limit: number } = { limit: 100 },
) => {
	const MonumentDocuments = await collections.monument.listDocuments([Query.limit(limit)])

	return transformMonumentsDocumentsIntoMonuments(...MonumentDocuments.documents)
}
