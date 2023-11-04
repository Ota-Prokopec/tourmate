import { list, nullable, objectType } from 'nexus'
import UsersPreferences from './UsersPreferences'
import { fromLatLongIntoLocation } from '../lib/database/experiences-monuments'
import { GraphqlDocument, Preferences } from '@app/ts-types'
import { Queries } from '../lib/appwrite/appwrite'

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
		t.nullable.boolean('status')
		t.nullable.boolean('emailVerification')
		t.nullable.boolean('phoneVerification')
		t.field('profilePictureURL', {
			type: 'URL',
			description: 'This is URL of profile picture. Not its id.',
		})
		t.nullable.field('prefs', {
			type: nullable(UsersPreferences),
		}),
			t.field('experiences', {
				type: list('Experience'),
				resolve: async (source, args, ctx, info) => {
					const { collections } = ctx.appwrite

					const queries = [Queries.experience.equal('userId', source.userId)]
					return fromLatLongIntoLocation(
						...(await collections.experience.listDocuments(queries)).documents,
					)
				},
			}),
			t.field('monuments', {
				type: list('Monument'),
				resolve: async (source, args, ctx, info) => {
					const { collections } = ctx.appwrite

					const queries = [Queries.monument.equal('userId', source.userId)]

					return fromLatLongIntoLocation(
						...(await collections.monument.listDocuments(queries)).documents,
					)
				},
			})
	},
})
