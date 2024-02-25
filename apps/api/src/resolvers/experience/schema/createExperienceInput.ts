import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'CreateExperienceInput',
	definition: (t) => {
		t.nullable.string('picture')
		t.field('location', { type: 'Location' })
		t.string('connnectedMonumentId')
	},
})
