import { makeSchema } from 'nexus'
import { join } from 'path'
import * as resolvers from './resolvers/index'
import * as schema from './schema/index'
import * as scalarTypes from './lib/types/index'

export default makeSchema({
	types: [schema, scalarTypes, resolvers],
	outputs: {
		typegen: join(__dirname, 'generated/nexus-typegen.ts'), // 2
		schema: join(__dirname, 'generated/schema.graphql'), // 3
	},
	contextType: {
		module: join(__dirname, './context.ts'),
		export: 'Context',
	},
	nonNullDefaults: {
		output: true,
		input: true,
	},
})
