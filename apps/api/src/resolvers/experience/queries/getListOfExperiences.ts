import { arg, list, nullable, queryField, stringArg } from 'nexus'
import {
	fromLatLongIntoLocation,
	locationQueries,
} from '../../../lib/database/experiences-monuments'
import { Queries } from '../../../lib/appwrite/appwrite'
import { defaultRangeMeters } from '../../../arguments'

export default queryField('getListOfExperiences', {
	type: list('Experience'),
	args: {
		location: nullable('LocationInput'),
	},
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite
		const { location: locationOptions } = args

		const queries: string[] = []

		if (locationOptions)
			queries.push(
				...locationQueries(
					locationOptions.location,
					locationOptions.rangeMeters ?? defaultRangeMeters,
				),
			)

		return fromLatLongIntoLocation(
			...(await collections.experience.listDocuments(queries)).documents,
		)
	},
})
