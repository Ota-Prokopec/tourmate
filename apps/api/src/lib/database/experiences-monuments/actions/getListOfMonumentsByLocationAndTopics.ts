import appwrite, { Queries } from '../../../appwrite/appwrite'
import type { Location, Topic } from '@app/ts-types'
import { getMonumentQueriesForSearchingByLocation } from './getListOfMonumentsByLocation'
import { transformMonumentsDocumentsIntoMonuments } from '../transformers'

export default async (
	{
		location,
		range,
		limit = 100,
		topics,
	}: { location: Location; range: number; limit?: number; topics: Topic[] },
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
) => {
	let queries = [
		...getMonumentQueriesForSearchingByLocation(location, range, limit),
		...topics.map((topic) => Queries.monument.search('topics', topic)),
	]

	const MonumentDocuments = await collections.monument.listDocuments(queries)

	return transformMonumentsDocumentsIntoMonuments(...MonumentDocuments.documents)
}
