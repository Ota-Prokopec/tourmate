import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'MonumentTopicsInput',
	definition: (t) => {
		t.list.field({ name: 'topics', type: 'Topic' })
	},
})
