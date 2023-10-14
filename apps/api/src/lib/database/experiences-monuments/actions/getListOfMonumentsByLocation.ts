import type { Location } from '@app/ts-types'
import appwrite from '../../../appwrite/appwrite'
import { transformMonumentsDocumentsIntoMonuments } from '../transformers'
import query from '../../../appwrite/tools/query'

export const getListOfMonumentsByLocation = async (
	{ location, zoom, limit = 100 }: { location: Location; zoom: number; range?: number; limit?: number },
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
) => {
	const rangeLatitudeMax = Math.floor(location[0] + zoom * zoom)
	const rangeLatitudeMin = Math.floor(location[0] - zoom * zoom)
	const rangeLongitudeMax = Math.floor(location[1] + zoom * zoom)
	const rangeLongitudeMin = Math.floor(location[1] - zoom * zoom)

	const queries = [
		query.monument.lessThan('latitude', rangeLatitudeMax),
		query.monument.greaterThan('latitude', rangeLatitudeMin),
		query.monument.lessThan('longitude', rangeLongitudeMax),
		query.monument.greaterThan('longitude', rangeLongitudeMin),
		query.monument.limit(limit),
	]

	const MonumentDocuments = await collections.monument.listDocuments(queries)

	return transformMonumentsDocumentsIntoMonuments(...MonumentDocuments.documents)
}
