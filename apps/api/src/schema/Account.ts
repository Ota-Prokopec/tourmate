import { objectType } from 'nexus'

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
		t.boolean('status')
		t.boolean('emailVerification')
		t.boolean('phoneVerification')
		t.field('profilePictureURL', {
			type: 'URL',
			description: 'This is URL of profile picture. Not its id.',
		})
		t.field('prefs', {
			type: 'UsersPreferences',
		})
		t.field('secondsFromUserCreatedToNow', {
			type: 'Float',
			resolve: (source, args, ctx) => {
				const miliProfileCreated = new Date(source._createdAt).getTime() //time from ever to moment when user created the profile
				const miliNow = new Date().getTime() //time from ever to now
				console.log(miliProfileCreated)
				const secondsFromUserCreatedToNow = (miliNow - miliProfileCreated) / 1000
				return Math.floor(secondsFromUserCreatedToNow)
			},
		})
	},
})
