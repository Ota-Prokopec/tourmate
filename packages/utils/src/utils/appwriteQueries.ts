import type { Location } from '@app/ts-types'
import { Query } from 'appwrite'

/**
 * @param meters is in the meters not degrees
 */
export const locationQueries = (location: Location, meters: number) => {
	const range = meters / 96700

	const rangeLatitudeMax = location[0] + range
	const rangeLatitudeMin = location[0] - range
	const rangeLongitudeMax = location[1] + range
	const rangeLongitudeMin = location[1] - range

	return [
		Query.lessThanEqual('latitude', rangeLatitudeMax),
		Query.greaterThanEqual('latitude', rangeLatitudeMin),
		Query.lessThanEqual('longitude', rangeLongitudeMax),
		Query.greaterThanEqual('longitude', rangeLongitudeMin),
	]
}
