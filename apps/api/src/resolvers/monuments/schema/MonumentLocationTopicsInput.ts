import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'MonumentLocationAndTopicsInput',
	definition: (t) => {
		t.field({ name: 'location', type: 'Location' })
		t.float('range')
		t.list.field({ name: 'topics', type: 'Topic' })
	},
})
