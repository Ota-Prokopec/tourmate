import { ApolloError } from 'apollo-server-express'
import { queryField, stringArg } from 'nexus'
import { Queries } from '../../../lib/appwrite/appwrite'

export default queryField('getTour', {
	args: { tourId: stringArg() },
	type: 'Tour',
	resolve: async (s, args, ctx) => {
		if (!ctx.isAuthed(ctx.user)) throw new ApolloError('User is not authenticated')
		const { collections } = ctx.appwrite

		const query = Queries.tour.equal('$id', args.tourId)

		const tour = await collections.tour.getDocument([query])

		if (!tour) throw new ApolloError('Tour was not found')

		return tour
	},
})
