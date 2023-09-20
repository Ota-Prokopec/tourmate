import { makeSchema } from 'nexus'
import { join } from 'path'
import * as resolvers from './resolvers/index'
import * as schema from './schema/index'
import * as scalarTypes from './lib/scalarTypes/index'

import url from 'url'
import path from 'path'

//@ts-ignore
const dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default makeSchema({
	types: [scalarTypes, resolvers, schema],
	outputs: {
		typegen: join(dirname, 'generated/nexus-typegen.ts'), // 2
		schema: join(dirname, 'generated/schema.graphql'), // 3
	},
	contextType: {
		module: join(dirname, './context.ts'),
		export: 'Context',
	},
	nonNullDefaults: {
		output: true,
		input: true,
	},
})
