import { ApolloError } from 'apollo-server-express'
import { mutationField, stringArg } from 'nexus'

export default mutationField('createCheckpointCompletion', {
	type: 'CheckpointCompletion',
	args: { tourId: stringArg(), monumentId: stringArg() },
	resolve: async (s_, args, ctx, info) => {
		if (!ctx.isAuthed(ctx.user)) throw new ApolloError('User is not authenticated')

		const { collections } = ctx.appwrite

		const res = await collections.tourCheckpointCompletion.createDocument({
			monumentId: args.monumentId,
			tourId: args.tourId,
			userId: ctx.user.$id,
		})

		return res
	},
})
