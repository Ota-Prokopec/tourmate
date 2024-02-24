import { ApolloError } from 'apollo-server-express'
import { queryField, stringArg } from 'nexus'
import { Queries } from '../../../lib/appwrite/appwrite'

export default queryField('getTour', {
	args: { tourId: stringArg() },
	type: 'Tour',
	resolve: async (s, args, ctx) => {
		if (!ctx.isAuthed(ctx.user)) throw new ApolloError('User is not authenticated')
		const { collections } = ctx.appwrite

		console.log(args.tourId)

		const query = Queries.tour.equal('$id', args.tourId)

		console.log(query)

		const tour = await collections.tour.getDocument(query)

		console.log(tour)

		if (!tour) throw new ApolloError('Tour was not found')

		return tour
	},
})
