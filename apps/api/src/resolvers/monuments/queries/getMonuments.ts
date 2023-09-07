import { queryField, stringArg } from 'nexus'
import { transformMonumentsDocumentsIntoMonuments } from '@app/experience-database-server-graphql'

export default queryField('getMonument', {
	type: 'Monument',
	args: { id: stringArg() },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite
		return transformMonumentsDocumentsIntoMonuments(await collections.monument.getDocument(args.id))[0]
	},
})
