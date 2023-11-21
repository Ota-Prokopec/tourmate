import { inputObjectType } from 'nexus'

export default inputObjectType({
	name: 'QuestionInput',
	definition: (t) => {
		t.string('question')
		t.field({ name: 'correctAnswer', type: 'StringOrNumber' })
		t.nullable.list.string('pickingAnswers')
		t.field({ type: 'AnswerType', name: 'type' })
	},
})
