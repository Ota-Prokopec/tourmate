import { arg, list, nullable, queryField } from 'nexus'
import {
	getListOfMonuments,
	getListOfMonumentsByLocation,
} from '../../../lib/database/experiences-monuments'
import { isLocation } from '@app/utils'
import monumentInput from '../schema/monumentInput'
import getListOfMonumentsByLocationAndTopics from '../../../lib/database/experiences-monuments/actions/getListOfMonumentsByLocationAndTopics'

export default queryField('getListOfMonuments', {
	type: list('Monument'),
	args: { input: nullable(arg({ type: monumentInput })) },

	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		if (args.input && isLocation(args.input.location)) {
			return await getListOfMonumentsByLocation(
				{ location: args.input.location, range: args.input.range },
				collections,
			)
		} else if (args.input && isLocation(args.input.location) && args.input.topics) {
			return await getListOfMonumentsByLocationAndTopics(
				{
					location: args.input.location,
					range: args.input.range,
					topics: args.input.topics,
				},
				collections,
			)
		} else {
			return await getListOfMonuments(collections)
		}
	},
})
