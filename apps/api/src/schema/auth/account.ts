import { ApolloError } from 'apollo-server-express'
import { list, objectType } from 'nexus'
import UsersPreferences from './usersPreferences'
import { getListOfExperineceByUser, getListOfMonumentsByUser } from '@app/experience-database-server'

export default objectType({
	name: 'Account',
	definition: (t) => {
		t.string('updatedAt')
		t.string('createdAt')
		t.string('userId')
		t.string('myId')
		t.string('username')
		t.boolean('staus')
		t.boolean('emailVerification')
		t.boolean('phoneVerification')
		t.nullable.string('profilePictureURL', { description: 'This is URL of profile picture. Not its id.' })
		t.nullable.field('prefs', {
			type: UsersPreferences,
			resolve: (s, args, ctx) => {
				if (!ctx.isAuthed(ctx.user)) throw new ApolloError('Account Type')
				return {}
			},
		}),
			t.field('experiences', {
				type: list('Experience'),
				resolve: async (source, args, ctx, info) => {
					const { collections } = ctx.appwrite

					return await getListOfExperineceByUser({ userId: source.userId }, collections)
				},
			}),
			t.field('monuments', {
				type: list('Monument'),
				resolve: async (source, args, ctx, info) => {
					const { collections } = ctx.appwrite

					return getListOfMonumentsByUser({ userId: source.userId }, collections)
				},
			})
	},
})
