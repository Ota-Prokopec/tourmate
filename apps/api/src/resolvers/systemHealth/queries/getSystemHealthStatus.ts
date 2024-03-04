import { queryField } from 'nexus'
import appwrite from '../../../lib/appwrite/appwrite'

export default queryField('getSystemHealthStatus', {
	type: 'SystemHealthStatus',
	resolve: async (s, args, ctx) => {
		const { health } = appwrite.setAdmin()

		const appwriteHealth = await health.get()

		return {
			appwriteService: appwriteHealth.status === 'pass' ? true : false,
			graphqlService: true,
		}
	},
})
