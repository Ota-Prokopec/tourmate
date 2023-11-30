import { list, nullable, queryField, stringArg } from 'nexus'
import { ApolloError } from 'apollo-server-express'
import { Queries } from '../../../lib/appwrite/appwrite'

export default queryField('getUsers', {
	type: list('User'),
	args: { searchingText: nullable(stringArg()) },
	resolve: async (s, args, ctx, info) => {
		if (!ctx.isAuthed(ctx.user))
			throw new ApolloError('user is not authorizated to create account', '403')

		const { collections } = ctx.appwrite

		const queries: string[] = []

		if (args.searchingText)
			queries.push(Queries.userInfo.startsWith('username', args.searchingText))

		const { documents: users } = await collections.userInfo.listDocuments(queries)

		return users
	},
})