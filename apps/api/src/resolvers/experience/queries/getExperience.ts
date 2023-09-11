import { queryField, stringArg } from 'nexus'
import { transformExperienceDocumentsIntoExperience } from '@app/experience-database-server-graphql'

export default queryField('getExperience', {
	type: 'Experience',
	args: { id: stringArg() },
	resolve: async (s_, args, ctx, info) => {
		const { collections } = ctx.appwrite
		return transformExperienceDocumentsIntoExperience(await collections.experience.getDocument(args.id))[0]
	},
})
