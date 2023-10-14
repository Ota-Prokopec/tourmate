import { arg, list, nullable, queryField } from 'nexus'
import { getListOfMonuments, getListOfMonumentsByLocation } from '../../../lib/database/experiences-monuments'
import { isLocation } from '@app/ts-types'
import monumentInput from '../schema/monumentInput'

export default queryField('getListOfMonuments', {
	type: list('Monument'),
	args: { input: nullable(arg({ type: monumentInput })) },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		if (args.input && isLocation(args.input.location)) {
			return await getListOfMonumentsByLocation({ location: args.input.location, range: args.input.range }, collections)
		} else {
			return await getListOfMonuments(collections)
		}
	},
})
