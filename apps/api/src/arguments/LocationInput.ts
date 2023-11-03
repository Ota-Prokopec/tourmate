import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'LocationInput',
	definition: (t) => {
		t.field({ name: 'location', type: 'Location' })
		t.nullable.float('range')
	},
})
