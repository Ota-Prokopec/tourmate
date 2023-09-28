import { objectType } from 'nexus'

export default objectType({
	name: 'EmailLogin',
	definition: (t) => {
		t.string('session')
	},
})
