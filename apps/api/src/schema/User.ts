import { list, objectType } from 'nexus'

export default objectType({
	name: 'User',
	definition(t) {
		t.int('id')
		t.string('username')
		t.string('email')
		t.field('posts', {
			type: list('Post'),
			resolve() {
				return [{ id: 1, title: 'Nexus', body: '...', published: false }]
			},
		})
	},
})
