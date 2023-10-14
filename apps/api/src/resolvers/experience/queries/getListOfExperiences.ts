import { arg, list, nullable, queryField, stringArg } from 'nexus'
import { getListOfExperineces, getListOfExperineceByLocation } from '../../../lib/database/experiences-monuments'
import experienceInput from '../schema/ExperienceInput'
import { isLocation } from '@app/ts-types'

export default queryField('getListOfExperiences', {
	type: list('Experience'),
	args: { input: nullable(arg({ type: experienceInput })) },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		if (args.input && isLocation(args.input.location)) {
			return await getListOfExperineceByLocation({ location: args.input.location, range: args.input.range }, collections)
		} else {
			return await getListOfExperineces(collections)
		}
	},
})
