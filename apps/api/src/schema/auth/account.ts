import { ApolloError } from 'apollo-server-express'
import { list, nullable, objectType } from 'nexus'
import UsersPreferences from './usersPreferences'
import { getListOfExperineceByUser, getListOfMonumentsByUser } from '@app/experience-database-server-graphql'
import { GraphqlDocument, Preferences } from '@app/ts-types'

export type AccountGetOutput = GraphqlDocument<{
	emailVerification: boolean
	myId: string
	prefs: Preferences | null
	staus: boolean
	username: string
	phoneVerification: boolean
	userId: string
	profilePictureURL?: URL | null | undefined
}>

export default objectType({
	name: 'Account',
	definition: (t) => {
		t.string('_createdAt')
		t.string('_updatedAt')
		t.string('_collectionId')
		t.string('_id')
		t.list.string('_permissions')
		t.string('_databaseId')
		t.string('userId')
		t.string('myId')
		t.string('username')
		t.boolean('staus')
		t.boolean('emailVerification')
		t.boolean('phoneVerification')
		t.nullable.field('profilePictureURL', { type: 'URL', description: 'This is URL of profile picture. Not its id.' })
		t.nullable.field('prefs', {
			type: nullable(UsersPreferences),
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
