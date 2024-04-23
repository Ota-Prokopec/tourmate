import { ApolloError } from 'apollo-server-express'
import { queryField, stringArg } from 'nexus'
import { cookieSettings } from '@app/settings'

export default queryField('createAnonymousSession', {
	type: 'Session',
	resolve: async (source, args, ctx, info) => {
		try {
			const { account } = ctx.appwrite

			const { sessionToken: cookie } = await account.createAnonymousSessionViaSSR()
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
