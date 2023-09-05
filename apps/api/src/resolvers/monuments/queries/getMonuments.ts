import { queryField, stringArg } from 'nexus'
import { transformMonumentsDocumentsIntoMonuments } from '@app/experience-database-server'
import { transformAppwriteDocumentsIntoGraphqlDocuments } from '@app/appwrite-nexus'

export default queryField('getMonument', {
	type: 'Monument',
	args: { id: stringArg() },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite
		return transformAppwriteDocumentsIntoGraphqlDocuments(
			...transformMonumentsDocumentsIntoMonuments(await collections.monument.getDocument(args.id)),
		)[0]
	},
})
