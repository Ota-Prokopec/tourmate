import { ObjectDefinitionBlock } from 'nexus/dist/core'

export const addDocument = (t: ObjectDefinitionBlock<''>) => {
	t.string('_createdAt')
	t.string('_updatedAt')
	t.string('_collectionId')
	t.string('_id')
	t.list.string('_permissions')
}
