import { objectType } from 'nexus'

export default objectType({
	name: 'Post',
	definition(t) {
		t.int('id')
		t.string('title')
		t.nullable.string('body')
		t.boolean('published')
	},
})
