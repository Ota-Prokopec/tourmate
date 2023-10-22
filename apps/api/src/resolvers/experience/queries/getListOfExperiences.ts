import { arg, list, nullable, queryField, stringArg } from 'nexus'
import { getListOfExperineces } from '../../../lib/database/experiences-monuments'

export default queryField('getListOfExperiences', {
	type: list('Experience'),
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		return await getListOfExperineces(collections)
	},
})
