import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'ImageTextInput',
	definition: (t) => {
		t.string('text')
		t.string('textStyles')
	},
})
