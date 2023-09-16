import { extendInputType, inputObjectType, objectType, queryType } from 'nexus'

export default inputObjectType({
	name: 'CreateAccountInput',
	definition: (t) => {
		t.string('myId')
		t.string('username')
	},
})
