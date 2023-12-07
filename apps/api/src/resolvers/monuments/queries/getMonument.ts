import { queryField, stringArg } from 'nexus'
import { fromLatDocumentLongIntoLocationDocument } from '../../../lib/database/experiences-monuments'

export default queryField('getMonument', {
	type: 'Monument',
	args: { id: stringArg() },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		const monumentDocument = await collections.monument.getDocument(args.id)

		if (!monumentDocument) throw new Error('Monument not found')
		const res = fromLatDocumentLongIntoLocationDocument(monumentDocument)[0]
		if (!res) throw new Error('Monument not found')
		return res
	},
})
