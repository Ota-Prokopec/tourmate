import type { CodegenConfig } from '@graphql-codegen/cli';

const codegenConfigConfig: CodegenConfig['config'] = {
	clientPath: './client',
	scalars: {
		// Recommended ID scalar type for clients:
		URL: {
			input: 'URL',
			output: 'URL'
		},
		// Setting custom scalar type:
		Location: {
			input: '[number, number]', // this means our server can take CustomScalar as string
			output: '[number, number]' // this means our server will return CustomScalar as number
		},
		Topic: '"castle" | "monument" | "person" | "animals" | "hiking" | null'
	}
};

const config: CodegenConfig = {
	schema: '../api/src/generated/schema.graphql',
	documents: './src/graphql/**/*.gql',
	generates: {
		'./src/graphql/generated-svelte.ts': {
			plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
			config: codegenConfigConfig
		},
		'./src/graphql/generated.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
			config: codegenConfigConfig
		}
	}
};
export default config;
