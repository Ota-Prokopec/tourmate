import { arg, list, nullable, queryField, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-express'
import { Queries } from '../../../lib/appwrite/appwrite'

export default queryField('getListOfUsers', {
	type: list('User'),
	args: {
		searchingText: nullable(stringArg()),
		limit: nullable(arg({ type: 'Int', default: 50 })),
		offset: nullable('Int'),
	},
	resolve: async (s, args, ctx, info) => {
		if (!ctx.isAuthed(ctx.user))
			throw new ApolloError('user is not authorizated to create account', '403')

		const { searchingText, limit, offset } = args

		const { collections } = ctx.appwrite

		const queries: string[] = []

		if (searchingText)
			queries.push(Queries.userInfo.startsWith('username', searchingText))
		if (limit) queries.push(Queries.monument.limit(limit))
		if (offset) queries.push(Queries.monument.offset(offset))

		//ordering
		queries.push(Queries.userInfo.orderDesc('$createdAt'))

		const { documents: users } = await collections.userInfo.listDocuments(queries)

		return users
	},
})
