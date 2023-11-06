import type { Location } from '@app/ts-types'
import { Query } from 'appwrite'

export const locationQueries = (
	location: Location,
	range?: number | undefined | null,
) => {
	if (!range) range = 10

	const rangeLatitudeMax = location[0] + range
	const rangeLatitudeMin = location[0] - range
	const rangeLongitudeMax = location[1] + range
	const rangeLongitudeMin = location[1] - range

	return [
		Query.lessThan('latitude', rangeLatitudeMax),
		Query.greaterThan('latitude', rangeLatitudeMin),
		Query.lessThan('longitude', rangeLongitudeMax),
		Query.greaterThan('longitude', rangeLongitudeMin),
	]
}
