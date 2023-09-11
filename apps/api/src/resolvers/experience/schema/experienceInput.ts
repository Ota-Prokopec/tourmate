import { inputObjectType } from 'nexus'
import { Location } from '@app/ts-types'

export default inputObjectType({
	name: 'ExperienceInput',
	definition: (t) => {
		t.field('location', { type: 'Location' }), t.int('zoom')
	},
})
