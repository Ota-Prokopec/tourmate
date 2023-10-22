import { arg, list, nullable, queryField } from 'nexus'
import { Queries } from '../../../lib/appwrite/appwrite'
import { transformMonumentsDocumentsIntoMonuments } from '../../../lib/database/experiences-monuments'

export default queryField('getListOfMonumentsByTopics', {
	args: { input: 'MonumentTopicsInput' },
	type: list('Monument'),

	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		const queries = args.input.topics.map((topic) =>
			Queries.monument.search('topics', topic),
		)

		const docs = await collections.monument.listDocuments(queries)
		return transformMonumentsDocumentsIntoMonuments(...docs.documents)
	},
})
