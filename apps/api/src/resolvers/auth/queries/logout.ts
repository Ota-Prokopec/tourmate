import { queryField } from 'nexus'

export default queryField('logout', {
	type: 'Boolean',
	resolve: async (source, args, ctx, info) => {
		const { account } = ctx.appwrite

		const { sessionToken: cookie } = await account.logOut()

		ctx.res.clearCookie(cookie.name)

		return true
	},
})
