import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'createAccount',
	definition: (t) => {
		t.string('myId')
		t.string('username')
	},
})
