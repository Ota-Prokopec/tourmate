import { objectType } from 'nexus'

export default objectType({
	name: 'UsersAnswerToQuestion',
	definition: (t) => {
		t.boolean('answeredCorrectly')
	},
})
