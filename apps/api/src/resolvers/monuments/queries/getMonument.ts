import { queryField, stringArg } from 'nexus'
import { fromLatLongIntoLocation } from '../../../lib/database/experiences-monuments'

export default queryField('getMonument', {
	type: 'Monument',
	args: { id: stringArg() },
	resolve: async (s, args, ctx, info) => {
		const { collections } = ctx.appwrite

		const monumentDocument = await collections.monument.getDocument(args.id)

		if (!monumentDocument) throw new Error('Monument not found')
		return fromLatLongIntoLocation(monumentDocument)[0]
	},
})
