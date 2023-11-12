import { arg, list, nullable, queryField, stringArg } from 'nexus'
import {
	locationQueries,
	fromLatLongIntoLocation,
} from '../../../lib/database/experiences-monuments'
import { Queries } from '../../../lib/appwrite/appwrite'
import { Topic, Transport } from '@app/ts-types'
import { defaultRangeMeters } from '../../../arguments'

export default queryField('getListOfMonuments', {
	type: list('Monument'),
	args: {
		location: nullable('LocationInput'),
		topics: nullable(list('Topic')),
		transports: nullable(list('Transport')),
		name: nullable('String'),
		limit: nullable(arg({ type: 'Int', default: 10 })),
		userId: nullable(stringArg()),
	},
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite
		const { location: locationOptions, topics, transports, name, limit, userId } = args

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

		return fromLatLongIntoLocation(
			...(await collections.monument.listDocuments(queries)).documents,
		)
	},
})
