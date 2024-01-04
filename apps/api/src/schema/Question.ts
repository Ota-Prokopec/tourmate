import { objectType } from 'nexus'

export default objectType({
	name: 'Question',
	definition: (t) => {
		t.string('_createdAt')
		t.string('_updatedAt')
		t.string('_collectionId')
		t.string('_id')
		t.list.string('_permissions')
		t.string('_databaseId')
		t.string('question')
		t.nullable.field({ name: 'correctAnswer', type: 'StringOrNumber' })
		t.nullable.list.string('pickingAnswers')
		t.field({ type: 'AnswerType', name: 'type' })
	},
})
