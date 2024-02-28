import { ApolloError } from 'apollo-server-express'
import { list, nullable, queryField } from 'nexus'
import { Queries } from '../../../lib/appwrite/appwrite'

export default queryField('getListOfTours', {
	args: { userId: nullable('String'), limit: nullable('Int'), offset: nullable('Int') },
	type: list('Tour'),
	resolve: async (s, args, ctx) => {
		if (!ctx.isAuthed(ctx.user)) throw new ApolloError('User is not authenticated')
		const { collections } = ctx.appwrite

		const queries: string[] = []

		if (args.userId) queries.push(Queries.tour.equal('userId', args.userId))
		if (args.limit) queries.push(Queries.tour.limit(args.limit))
		if (args.offset) queries.push(Queries.tour.offset(args.offset))

		const tours = await collections.tour.listDocuments(queries)
		return tours.documents
	},
})
