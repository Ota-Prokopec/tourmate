import { arg, intArg, list, nullable, queryField, stringArg } from 'nexus'
import {
	locationQueries,
	fromLatDocumentLongIntoLocationDocument,
} from '../../../lib/database/experiences-monuments'
import { Queries } from '../../../lib/appwrite/appwrite'
import type { Topic, Transport } from '@app/ts-types'
import { defaultRangeMeters } from '../../../arguments'

export default queryField('getListOfMonuments', {
	type: list('Monument'),
	args: {
		location: nullable('LocationInput'),
		topics: nullable(list('Topic')),
		transports: nullable(list('Transport')),
		name: nullable('String'),
		limit: nullable(arg({ type: 'Int', default: 50 })),
		userId: nullable(stringArg()),
		offset: nullable(intArg()),
	},
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite
		const {
			location: locationOptions,
			topics,
			transports,
			name,
			limit,
			userId,
			offset,
		} = args

		let queries: string[] = []

		if (locationOptions) {
			queries.push(
				...locationQueries(
					locationOptions.location,
					locationOptions.rangeMeters
						? locationOptions.rangeMeters
						: ctx.user?.prefs.mapRange ?? defaultRangeMeters,
				),
			)
		}

		if (topics)
			queries.push(
				...topics.map((topic: Topic) => Queries.monument.search('topics', topic)),
			)

		if (transports)
			queries.push(
				...transports.map((transport: Transport) =>
					Queries.monument.search('transports', transport),
				),
			)

		if (name) queries.push(Queries.monument.search('name', name))
		if (limit) queries.push(Queries.monument.limit(limit))
		if (userId) queries.push(Queries.monument.equal('userId', userId))
		if (offset) queries.push(Queries.monument.offset(offset))

		return fromLatDocumentLongIntoLocationDocument(
			...(await collections.monument.listDocuments(queries)).documents,
		)
	},
})
