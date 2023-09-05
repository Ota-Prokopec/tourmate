import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'ExperienceInput',
	definition: (t) => {
		t.list.float('location'), t.int('zoom')
	},
})
