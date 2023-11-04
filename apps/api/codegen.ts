import type { CodegenConfig } from '@graphql-codegen/cli'

const codegenConfigConfig: CodegenConfig['config'] = {
	clientPath: './client',
	scalars: {
		// Recommended ID scalar type for clients:
		URL: {
			input: 'URL',
			output: 'URL',
		},
		// Setting custom scalar type:
		Location: {
			input: '[number, number]', // this means our server can take CustomScalar as string
			output: '[number, number]', // this means our server will return CustomScalar as number
		},
		Topic: '"castle" | "monument" | "person" | "animals" | "hiking"',
	},
}

const config: CodegenConfig = {
	schema: './src/generated/schema.graphql',
	documents: '../web/src/graphql/**/*.gql',
	generates: {
		'./src/tests/graphql/generßated.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
			config: codegenConfigConfig,
		},
	},
}
export default config
