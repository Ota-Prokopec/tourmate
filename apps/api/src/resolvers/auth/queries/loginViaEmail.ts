import { ApolloError } from 'apollo-server-express'
import { queryField, stringArg } from 'nexus'
import { cookieSettings } from '@app/settings'

// ! dont check if user has created Account in userInfo because user logs in with this query in register for creating an acccount
//	args: { email: stringArg(), password: stringArg(), posts: arg({ type: 'PostInput' }) },

export default queryField('logInViaEmail', {
	type: 'EmailLogin',
	args: { email: stringArg(), password: stringArg() },
	resolve: async (source, args, ctx, info) => {
		try {
			const { account } = ctx.appwrite

			const { sessionToken: cookie } = await account.loginViaEmail(
				args.email,
				args.password,
			)
			ctx.res.cookie(`a_session_${process.env.APPWRITE_PROJECT_ID}`, cookie.value, {
				...cookieSettings,
				domain: process.env.SERVER_HOSTNAME_COOKIES,
			})

			return { session: cookie.value }
		} catch (error) {
			if (error instanceof Error) {
				throw new ApolloError('Signing in was not successful', error.message)
			} else throw error
		}
	},
})
