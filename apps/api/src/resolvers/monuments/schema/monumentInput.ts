import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'MonumentInput',
	definition: (t) => {
		t.list.float('location'),
			t.float('range'),
			t.nullable.list.field({ name: 'topics', type: 'Topic' })
	},
})
