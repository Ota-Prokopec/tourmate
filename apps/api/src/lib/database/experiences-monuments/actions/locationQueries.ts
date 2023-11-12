import type { Location } from '@app/ts-types'
import { metersToDegree } from '@app/utils'
import { Query } from 'appwrite'

/**
 * @param meters is in the meters not degrees
 */
export const locationQueries = (location: Location, meters: number) => {
	const range = meters / 96700
	console.log(range)

	const rangeLatitudeMax = location[0] + range
	const rangeLatitudeMin = location[0] - range
	const rangeLongitudeMax = location[1] + range
	const rangeLongitudeMin = location[1] - range

	console.log({
		rangeLatitudeMax,
		rangeLatitudeMin,
		rangeLongitudeMax,
		rangeLongitudeMin,
	})

	return [
		Query.lessThanEqual('latitude', rangeLatitudeMax),
		Query.greaterThanEqual('latitude', rangeLatitudeMin),
		Query.lessThanEqual('longitude', rangeLongitudeMax),
		Query.greaterThanEqual('longitude', rangeLongitudeMin),
	]
}
