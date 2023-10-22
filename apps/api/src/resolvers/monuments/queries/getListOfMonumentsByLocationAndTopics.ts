import { arg, list, nullable, queryField } from 'nexus'
import getListOfMonumentsByLocationAndTopics from '../../../lib/database/experiences-monuments/actions/getListOfMonumentsByLocationAndTopics'

export default queryField('getListOfMonumentsByLocationAndTopics', {
	args: { input: 'MonumentLocationAndTopicsInput' },
	type: list('Monument'),

	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		return await getListOfMonumentsByLocationAndTopics(
			{
				location: args.input.location,
				range: args.input.range,
				topics: args.input.topics,
			},
			collections,
		)
	},
})
