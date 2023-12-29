import { arg, list, nullable, queryField, stringArg } from 'nexus'
import { fromLatDocumentLongIntoLocationDocument } from '../../../lib/database/experiences-monuments'
import { Queries } from '../../../lib/appwrite/appwrite'
import { defaultRangeMeters } from '../../../arguments'
import { locationQueries } from '@app/utils'

export default queryField('getListOfExperiences', {
	type: list('Experience'),
	args: {
		location: nullable('LocationInput'),
		userId: nullable('String'),
		limit: nullable('Int'),
		offset: nullable('Int'),
	},
	resolve: async (s_, args, ctx, info) => {
		const { collections } = ctx.appwrite
		const { location: locationOptions, userId, limit, offset } = args

		const queries: string[] = []

		if (locationOptions)
			queries.push(
				...locationQueries(
					locationOptions.location,
					locationOptions.rangeMeters ?? defaultRangeMeters,
				),
			)

		if (userId) queries.push(Queries.experience.equal('userId', userId))
		if (limit) queries.push(Queries.experience.limit(limit))
		if (offset) queries.push(Queries.experience.offset(offset))

		//desc sorting
		queries.push(Queries.experience.orderDesc('$createdAt'))

		return fromLatDocumentLongIntoLocationDocument(
			...(await collections.experience.listDocuments(queries)).documents,
		)
	},
})
