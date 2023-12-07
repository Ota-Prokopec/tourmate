import { objectType } from 'nexus'
import { getUser } from '../lib/users/getUser'

export default objectType({
	name: 'MonumentLike',
	definition: (t) => {
		t.string('_createdAt')
		t.string('_updatedAt')
		t.string('_collectionId')
		t.string('_id')
		t.list.string('_permissions')
		t.string('_databaseId')
		t.string('userId')
		t.string('monumentId')
		t.field('user', {
			type: 'User',
			resolve: async (source, args, ctx) => {
				const { collections } = ctx.appwrite
				return await getUser(source.userId, collections)
			},
		})
	},
})
