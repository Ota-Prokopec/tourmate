import { queryField, stringArg } from 'nexus'
import { transformExperienceDocumentsIntoExperience } from '@app/experience-database-server'
import { transformAppwriteDocumentsIntoGraphqlDocuments } from '@app/appwrite-nexus'

export default queryField('getExperience', {
	type: 'Experience',
	args: { id: stringArg() },
	resolve: async (s_, args, ctx, info) => {
		const { collections } = ctx.appwrite
		const experience = transformAppwriteDocumentsIntoGraphqlDocuments(
			...transformExperienceDocumentsIntoExperience(await collections.experience.getDocument(args.id)),
		)[0]
		return experience
	},
})
