import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'MonumentInputByName',
	definition: (t) => {
		t.string('name')
		t.int('limit')
	},
})
