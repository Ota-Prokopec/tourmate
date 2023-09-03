import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'PostInput',
	definition(t) {
		t.int('id')
		t.string('title')
		t.nullable.string('body')
		t.boolean('published')
	},
})
