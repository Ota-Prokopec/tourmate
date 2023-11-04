import { permissions } from '@app/appwrite-ssr-graphql'
import { mutationField, queryField, stringArg } from 'nexus'
import appwrite from '../../../../lib/appwrite/appwrite'

export default mutationField('likeExperience', {
	args: { experienceId: stringArg() },
	type: 'ExperienceLike',
	resolve: async (s_, args, ctx) => {
		const { collections } = appwrite.setAdmin()
		if (!ctx.isAuthed(ctx.user?.$id)) throw new Error('User is not authenticated')
		const experience = await collections.experience.getDocument(args.experienceId)
		if (!experience) throw new Error('There is no monument below this id')
		const experienceLike = await collections.experienceLike.createDocument(
			{ experienceId: args.experienceId, userId: ctx.user.$id },
			permissions.owner(ctx.user?.$id, experience.userId),
		)
		return experienceLike
	},
})
