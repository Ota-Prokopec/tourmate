import type { Location } from '@app/ts-types'
import appwrite from '../../../appwrite/appwrite'
import { Query } from '@app/appwrite-server'
import { transformExperienceDocumentsIntoExperience } from '../transformers'

export const getListOfExperineceByLocation = async (
	{ location, zoom, range = 10, limit = 100 }: { location: Location; zoom: number; range?: number; limit?: number },
	collections: ReturnType<typeof appwrite.setCookie>['collections'],
) => {
	const rangeLatitudeMax = Math.floor(location[0] + range / zoom)
	const rangeLatitudeMin = Math.floor(location[0] - range / zoom)
	const rangeLongitudeMax = Math.floor(location[1] + range / zoom)
	const rangeLongitudeMin = Math.floor(location[1] - range / zoom)

	const experienceDocuments = await collections.experience.listDocuments([
		Query.lessThan('latitude', rangeLatitudeMax),
		Query.greaterThan('latitude', rangeLatitudeMin),
		Query.lessThan('longitude', rangeLongitudeMax),
		Query.greaterThan('longitude', rangeLongitudeMin),
		Query.limit(limit),
	])
	return transformExperienceDocumentsIntoExperience(...experienceDocuments.documents)
}
