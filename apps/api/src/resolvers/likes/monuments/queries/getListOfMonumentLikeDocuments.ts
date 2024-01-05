import { permissions } from '@app/appwrite-ssr-graphql'
import { arg, list, mutationField, nullable, queryField, stringArg } from 'nexus'
import appwrite, { Queries } from '../../../../lib/appwrite/appwrite'

export default queryField('getListOfMonumentLikeDocuments', {
	type: list('MonumentLike'),
	args: {
		offset: nullable('Int'),
		limit: nullable(arg({ type: 'Int', default: 50 })),
		userId: nullable('String'),
	},
	resolve: async (s_, args, ctx) => {
		const { collections } = appwrite.setAdmin()
		if (!ctx.isAuthed(ctx.user)) throw new Error('User is not authenticated')
		let queries: string[] = []

		const { offset, limit, userId } = args

		if (limit) queries.push(Queries.monumentLike.limit(limit))
		if (offset) queries.push(Queries.monumentLike.offset(offset))
		if (userId) queries.push(Queries.monumentLike.equal('userId', userId))

		const docs = await collections.monumentLike.listDocuments(queries)
		return docs.documents
	},
})
