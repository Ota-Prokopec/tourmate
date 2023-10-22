import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'MonumentLocationInput',
	definition: (t) => {
		t.field({ name: 'location', type: 'Location' }), t.float('range')
	},
})
