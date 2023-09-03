import { arg, nonNull, queryField, stringArg } from 'nexus'
import { client } from '../../../../lib/appwrite'
import { ApolloError } from 'apollo-server-express'

//	args: { email: stringArg(), password: stringArg(), posts: arg({ type: 'PostInput' }) },

export default queryField('logInViaEmail', {
	type: 'EmailLogin',
	args: { email: stringArg(), password: stringArg() },
	resolve: async (source, args, ctx, info) => {
		const { account } = client.none()

		try {
			const { sessionToken: cookie } = await account.loginViaEmail(args.email, args.password)

			ctx.res.cookie(`a_session_${process.env.APPWRITE_PROJECT_ID}`, cookie.value, {
				sameSite: 'lax',
				domain: process.env.SERVER_HOSTNAME,
				secure: true,
				maxAge: 1000000000,
				httpOnly: true,
			})

			return { session: cookie.value }
		} catch (error) {
			console.log(error)

			throw new ApolloError('too many sessions were created, wait few minutes and try it again, or use login via social media.', '429')
		}
	},
})
