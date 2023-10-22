import { arg, list, nullable, queryField } from 'nexus'
import { getListOfMonumentsByLocation } from '../../../lib/database/experiences-monuments'
import MonumentLocationInput from '../schema/MonumentLocationInput'

export default queryField('getListOfMonumentsByLocation', {
	type: list('Monument'),
	args: { input: arg({ type: MonumentLocationInput }) },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		return await getListOfMonumentsByLocation(
			{ location: args.input.location, range: args.input.range },
			collections,
		)
	},
})
