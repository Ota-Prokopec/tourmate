import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'CreateExperienceInput',
	definition: (t) => {
		t.string('picture')
		t.field('location', { type: 'Location' })
	},
})
