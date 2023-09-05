import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'MonumentInput',
	definition: (t) => {
		t.list.float('location'), t.int('zoom')
	},
})
