import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'CreateTourInput',
	definition: (t) => {
		t.string('tourName')
		t.list.string('monumentIds')
	},
})
