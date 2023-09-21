import { arg, list, nullable, queryField, stringArg } from 'nexus'
import { getListOfExperineces, getListOfExperineceByLocation } from '@app/experience-database-server-graphql'
import experienceInput from '../schema/experienceInput'
import { isLocation } from '@app/ts-types'

export default queryField('getListOfExperiences', {
	type: list('Experience'),
	args: { input: nullable(arg({ type: experienceInput })) },
	resolve: async (s, args, ctx, info) => {
		args.input?.location

		const { collections } = ctx.appwrite

		if (args.input && isLocation(args.input.location)) {
			return await getListOfExperineceByLocation({ location: args.input.location, zoom: args.input.zoom }, collections)
		} else {
			return await getListOfExperineces(collections)
		}
	},
})
