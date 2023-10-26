import { arg, list, nullable, queryField } from 'nexus'
import { getListOfMonuments } from '../../../lib/database/experiences-monuments'
import { Queries } from '../../../lib/appwrite/appwrite'

export default queryField('getListOfMonuments', {
	type: list('Monument'),
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		return await getListOfMonuments(collections, {
			limit: 10,
			queries: [Queries.monument.notEqual('creatorUserId', ctx.user?.$id)],
		})
	},
})
