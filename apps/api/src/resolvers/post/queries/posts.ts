import { intArg, list, queryField, nullable, arg } from 'nexus'

export default queryField('posts', {
	type: list('Post'),
	args: {
		limit: nullable(intArg()),
	},
	resolve(source, args, ctx, info) {
		return [{ id: 1, title: 'Nexus', body: '...', published: false }]
	},
})
