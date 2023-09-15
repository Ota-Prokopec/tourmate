import { queryField, stringArg } from 'nexus'
import { transformMonumentsDocumentsIntoMonuments } from '@app/experience-database-server-graphql'

export default queryField('getMonument', {
	type: 'Monument',
	args: { id: stringArg() },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite
		const monumentDocument = await collections.monument.getDocument(args.id)
		if (!monumentDocument) throw new Error('Monument not found')
		return transformMonumentsDocumentsIntoMonuments(monumentDocument)[0]
	},
})
