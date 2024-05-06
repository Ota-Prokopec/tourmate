import { permissions } from '@app/appwrite-ssr-graphql'
import { ApolloError } from 'apollo-server-express'
import { arg, mutationField } from 'nexus'
import CreateTourInput from '../schema/CreateTourInput'

export default mutationField('createTour', {
	args: { input: arg({ type: CreateTourInput }) },
	type: 'Tour',
	resolve: async (s, args, ctx) => {
		if (!ctx.isAuthed(ctx.user)) throw new ApolloError('User is not authenticated')
		const { collections } = ctx.appwrite
		const tour = await collections.tour.createDocument(
			{
				userId: ctx.user.$id,
				monumentIds: args.input.monumentIds,
				tourName: args.input.tourName,
			},
			permissions.owner(ctx.user.$id),
		)
		return tour
	},
})
