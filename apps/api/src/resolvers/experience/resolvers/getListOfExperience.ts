import { arg, list, nullable, queryField, stringArg } from 'nexus'
import { getListOfExperinece, getListOfExperineceByLocation } from '@app/experience-database-server'
import experienceInput from '../schema/experienceInput'
import { isLocation } from '@app/ts-types'

export default queryField('getListOfExperience', {
	type: list('Experience'),
	args: { input: nullable(arg({ type: experienceInput })) },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		if (args.input && isLocation(args.input.location)) {
			return await getListOfExperineceByLocation({ location: args.input.location, zoom: args.input.zoom }, collections)
		} else {
			return await getListOfExperinece(collections)
		}
	},
})
