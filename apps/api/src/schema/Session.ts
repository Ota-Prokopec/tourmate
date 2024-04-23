import { objectType } from 'nexus'

export default objectType({
	name: 'Session',
	definition: (t) => {
		t.string('session')
	},
})
