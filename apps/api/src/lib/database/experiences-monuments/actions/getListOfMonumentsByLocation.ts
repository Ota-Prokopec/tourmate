import type { Location } from '@app/ts-types'
import appwrite from '../../../appwrite/appwrite'
import { transformMonumentsDocumentsIntoMonuments } from '../transformers'
import query from '../../../appwrite/tools/query'

export const getMonumentQueriesForSearchingByLocation = (
	location: Location,
	range: number,
	limit: number,
) => {
	const rangeLatitudeMax = location[0] + range / 2
	const rangeLatitudeMin = location[0] - range / 2
	const rangeLongitudeMax = location[1] + range / 2
	const rangeLongitudeMin = location[1] - range / 2

	return [
		query.monument.lessThan('latitude', rangeLatitudeMax),
		query.monument.greaterThan('latitude', rangeLatitudeMin),
		query.monument.lessThan('longitude', rangeLongitudeMax),
		query.monument.greaterThan('longitude', rangeLongitudeMin),
		query.monument.limit(limit),
	]
}

export const getListOfMonumentsByLocation = async (
	{ location, range, limit = 100 }: { location: Location; range: number; limit?: number },
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
) => {
	const queries = getMonumentQueriesForSearchingByLocation(location, range, limit)

	const MonumentDocuments = await collections.monument.listDocuments(queries)

	return transformMonumentsDocumentsIntoMonuments(...MonumentDocuments.documents)
}
