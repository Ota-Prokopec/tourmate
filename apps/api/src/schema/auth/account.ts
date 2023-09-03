import { objectType } from 'nexus'

export default objectType({
	name: 'Account',
	definition: (t) => {
		t.string('id')
		t.string('updatedAt')
		t.string('createdAt')
		t.string('userId')
		t.string('myId')
		t.string('username')
		t.string('staus')
		t.string('emailVerification')
		t.string('phoneVerification')
		t.field('prefs', { type: 'UsersPreferences' })
	},
})
