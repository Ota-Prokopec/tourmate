import { queryField, stringArg } from 'nexus'
import { fromLatDocumentLongIntoLocationDocument } from '../../../lib/database/experiences-monuments'

export default queryField('getExperience', {
	type: 'Experience',
	args: { id: stringArg() },
	resolve: async (s_, args, ctx, info) => {
		const { collections } = ctx.appwrite
		const expDoc = await collections.experience.getDocument(args.id)
		if (!expDoc) throw new Error('exp not found')
		const res = fromLatDocumentLongIntoLocationDocument(expDoc)[0]
		if (!res) throw new Error('Experience not found')
		return res
	},
})
