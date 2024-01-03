import { queryField } from 'nexus'

export default queryField('setSession', {
	type: 'Boolean',
	args: { session: 'String' },
	resolve: async (source, args, ctx, info) => {
		await ctx.res.cookie(`a_session_${process.env.APPWRITE_PROJECT_ID}`, args.session, {
			sameSite: 'none',
			domain: process.env.SERVER_HOSTNAME_COOKIES,
			secure: true,
			maxAge: 999999999999999, //TODO: change this
			httpOnly: true,
			path: '/',
		})

		return true
	},
})
