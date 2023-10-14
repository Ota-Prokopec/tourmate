import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'ExperienceInput',
	definition: (t) => {
		t.field('location', { type: 'Location' }), t.int('range')
	},
})
