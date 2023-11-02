import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'CreateMonumentInput',
	definition: (t) => {
		t.nullable.string('picture')
		t.string('name')
		t.field('location', { type: 'Location' })
		t.string('about')
		t.string('placeName')
		t.list.field({ type: 'Topic', name: 'topics' })
		t.list.field({ type: 'Transport', name: 'transports' })
	},
})
