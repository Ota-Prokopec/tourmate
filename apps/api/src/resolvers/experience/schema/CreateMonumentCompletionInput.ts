import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'CreateMonumentCompletionInput',
	definition: (t) => {
		t.string('monumentId')
	},
})
