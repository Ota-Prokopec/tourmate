import { objectType } from 'nexus'

export default objectType({
	name: 'UsersPreferences',
	definition: (t) => {
		t.nullable.list.float('location')
		t.nullable.boolean('termsAccepted')
	},
})
