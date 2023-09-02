import { intArg, list, queryField, nullable, arg } from 'nexus'

export default queryField('users', {
	type: list('User'),
	resolve(source, args, ctx, info) {
		return []
	},
})
