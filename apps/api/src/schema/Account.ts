import { objectType } from 'nexus'
import UsersPreferences from './UsersPreferences'

export default objectType({
	name: 'Account',
	definition: (t) => {
		t.string('_createdAt')
		t.string('_updatedAt')
		t.string('_collectionId')
		t.string('_documentId')
		t.list.string('_permissions')
		t.string('_databaseId')
		t.string('userId')
		t.string('myId')
		t.string('username')
		t.float('secondsFromUserCreatedToNow')
		t.boolean('status')
		t.boolean('emailVerification')
		t.boolean('phoneVerification')
		t.field('profilePictureURL', {
			type: 'URL',
			description: 'This is URL of profile picture. Not its id.',
		})
		t.field('prefs', {
			type: UsersPreferences,
		})
	},
})
