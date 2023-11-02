import { arg, list, nullable, queryField } from 'nexus'
import {
	locationQueries,
	fromLatLongIntoLocation,
} from '../../../lib/database/experiences-monuments'
import { Queries } from '../../../lib/appwrite/appwrite'
import { Topic, Transport } from '@app/ts-types'

export default queryField('getListOfMonuments', {
	type: list('Monument'),
	args: {
		location: nullable('MonumentLocationInput'),
		topics: nullable(list('Topic')),
		transports: nullable(list('Transport')),
		name: nullable('String'),
		limit: nullable(arg({ type: 'Int', default: 10 })),
	},
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite
		const { location: locationOptions, topics, transports, name, limit } = args

		let queries: string[] = []

		if (locationOptions)
			queries.push(...locationQueries(locationOptions.location, locationOptions.range))

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

		return fromLatLongIntoLocation(
			...(await collections.monument.listDocuments(queries)).documents,
		)
	},
})
