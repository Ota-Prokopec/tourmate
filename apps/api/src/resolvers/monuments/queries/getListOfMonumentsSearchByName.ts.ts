import { arg, list, nullable, queryField, stringArg } from 'nexus'
import { transformMonumentsDocumentsIntoMonuments } from '../../../lib/database/experiences-monuments'
import MonumentNameInput from '../schema/MonumentNameInput'
import { Queries } from '../../../lib/appwrite/appwrite'

export default queryField('getListOfMonumentsSearchByName', {
	type: list('Monument'),
	args: { input: arg({ type: MonumentNameInput }) },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		const filters = [Queries.monument.startsWith('name', args.input.name), Queries.monument.limit(args.input.limit)]

		const res = transformMonumentsDocumentsIntoMonuments(...(await collections.monument.listDocuments(filters)).documents)

		return res
	},
})
