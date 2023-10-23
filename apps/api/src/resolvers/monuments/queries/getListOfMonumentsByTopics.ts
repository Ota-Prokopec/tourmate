import { arg, list, nullable, queryField } from 'nexus'
import { Queries } from '../../../lib/appwrite/appwrite'
import { transformMonumentsDocumentsIntoMonuments } from '../../../lib/database/experiences-monuments'
import { Topic } from '@app/ts-types'

export default queryField('getListOfMonumentsByTopics', {
	args: { input: 'MonumentTopicsInput' },
	type: list('Monument'),

	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		const queries = args.input.topics.map((topic: Topic) =>
			Queries.monument.search('topics', topic),
		)

		const docs = await collections.monument.listDocuments(queries)
		return transformMonumentsDocumentsIntoMonuments(...docs.documents)
	},
})
