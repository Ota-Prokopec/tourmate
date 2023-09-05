import type { Location } from '@app/ts-types'
import appwrite from '@app/appwrite-ssr-experiences'
import { numberTimingCoords } from '../settings'
import { Query } from '@app/appwrite-server'
import { transformMonumentsDocumentsIntoMonuments } from '../transformers'
import { transformAppwriteDocumentsIntoGraphqlDocuments } from '@app/appwrite-nexus'

export const getListOfMonumentsByLocation = async (
	{ location, zoom, range = 10, limit = 100 }: { location: Location; zoom: number; range?: number; limit?: number },
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
) => {
	const rangeLatitudeMax = Math.floor((location[0] + zoom * zoom) * numberTimingCoords)
	const rangeLatitudeMin = Math.floor((location[0] - zoom * zoom) * numberTimingCoords)
	const rangeLongitudeMax = Math.floor((location[1] + zoom * zoom) * numberTimingCoords)
	const rangeLongitudeMin = Math.floor((location[1] - zoom * zoom) * numberTimingCoords)

	const MonumentDocuments = await collections.monument.listDocuments([
		Query.lessThan('latitude', rangeLatitudeMax),
		Query.greaterThan('latitude', rangeLatitudeMin),
		Query.lessThan('longitude', rangeLongitudeMax),
		Query.greaterThan('longitude', rangeLongitudeMin),
		Query.limit(limit),
	])

	const monumentsForGraphql = transformAppwriteDocumentsIntoGraphqlDocuments(
		...transformMonumentsDocumentsIntoMonuments(...MonumentDocuments.documents),
	)

	return monumentsForGraphql
}
