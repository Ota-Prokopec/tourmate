import { list, objectType, stringArg } from 'nexus'

export default objectType({
	name: 'Post',
	definition(t) {
		t.int('id')
		t.string('title')
		t.nullable.string('body')
		t.boolean('published')
		t.field('author', {
			type: 'User',
			args: {
				email: stringArg(),
			},
			resolve(source, args, ctx, info) {},
		}),
			t.field('authors', {
				type: list('User'),
				resolve(source, args, ctx, info) {},
			})
	},
})
