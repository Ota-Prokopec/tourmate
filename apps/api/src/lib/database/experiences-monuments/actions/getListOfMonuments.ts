import appwrite, { Queries } from '../../../appwrite/appwrite'
import { transformMonumentsDocumentsIntoMonuments } from '../transformers'

export const getListOfMonuments = async (
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
	{ limit, queries }: { limit: number; queries: string[] } = {
		limit: 100,
		queries: [],
	},
) => {
	const MonumentDocuments = await collections.monument.listDocuments([
		Queries.monument.limit(limit),
		...queries,
	])

	return transformMonumentsDocumentsIntoMonuments(...MonumentDocuments.documents)
}
