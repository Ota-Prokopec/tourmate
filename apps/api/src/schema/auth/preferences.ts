import { objectType } from 'nexus'

export default objectType({
	name: 'UsersPreferences',
	definition: (t) => {
		t.list.float('location')
		t.boolean('termsAccepted')
	},
})
