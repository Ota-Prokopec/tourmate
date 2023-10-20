import { permissions } from '@app/appwrite-ssr-graphql'
import { mutationField, queryField, stringArg } from 'nexus'
import appwrite from '../../../../lib/appwrite/appwrite'

export default mutationField('likeMonument', {
	args: { monumentId: stringArg() },
	type: 'MonumentLike',
	resolve: async (s_, args, ctx) => {
		const { collections } = appwrite.setAdmin()
		if (!ctx.isAuthed(ctx.user?.$id)) throw new Error('User is not authenticated')
		const monument = await collections.monument.getDocument(args.monumentId)
		if (!monument) throw new Error('There is no monument below this id')
		const monumentLike = await collections.monumentLike.createDocument(
			{ monumentId: args.monumentId, userId: ctx.user?.$id },
			permissions.owner(ctx.user?.$id, monument.creatorUserId),
		)
		return monumentLike
	},
})
