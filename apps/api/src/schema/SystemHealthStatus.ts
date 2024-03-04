import { objectType } from 'nexus'

export default objectType({
	name: 'SystemHealthStatus',
	definition: (t) => {
		t.boolean('appwriteService')
		t.boolean('graphqlService')
	},
})
