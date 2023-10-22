import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'ExperienceLocationInput',
	definition: (t) => {
		t.field('location', { type: 'Location' }), t.float('range')
	},
})
