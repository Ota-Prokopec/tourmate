import { arg, list, nullable, queryField } from 'nexus'
import {
	getListOfMonuments,
	getListOfMonumentsByLocation,
} from '../../../lib/database/experiences-monuments'

export default queryField('getListOfMonuments', {
	type: list('Monument'),
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		return await getListOfMonuments(collections)
	},
})
