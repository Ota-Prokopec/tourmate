import { client } from '$lib/appwrite'
import { arg, nonNull, queryField, stringArg } from 'nexus'

export default queryField('logInViaEmail', {
	type: 'EmailLogin',
	args: { email: stringArg(), password: stringArg(), posts: arg({ type: 'PostInput' }) },
	resolve: (source, args, ctx, info) => {
		const { account } = client.none()
		const res = account.loginViaEmail()
	},
})
