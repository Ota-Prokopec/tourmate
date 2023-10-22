import { arg, list, nullable, queryField, stringArg } from 'nexus'
import {
	getListOfExperineces,
	getListOfExperineceByLocation,
} from '../../../lib/database/experiences-monuments'
import experienceInput from '../schema/ExperienceLocationInput'

export default queryField('getListOfExperiencesByLocation', {
	type: list('Experience'),
	args: { input: arg({ type: experienceInput }) },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		return await getListOfExperineceByLocation(
			{ location: args.input.location, range: args.input.range },
			collections,
		)
	},
})
