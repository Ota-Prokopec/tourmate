import type { Location } from '@app/ts-types'
import appwrite, { Queries } from '../../../appwrite/appwrite'
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
		Queries.experience.lessThan('latitude', rangeLatitudeMax),
		Queries.experience.greaterThan('latitude', rangeLatitudeMin),
		Queries.experience.lessThan('longitude', rangeLongitudeMax),
		Queries.experience.greaterThan('longitude', rangeLongitudeMin),
		Queries.experience.limit(limit),
	])
	return transformExperienceDocumentsIntoExperience(...experienceDocuments.documents)
}
