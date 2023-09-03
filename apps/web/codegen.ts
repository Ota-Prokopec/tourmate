import type { CodegenConfig } from '@graphql-codegen/cli';
import { resolve } from 'path';

const config: CodegenConfig = {
	schema: '../api/src/generated/schema.graphql',
	documents: './src/graphql/**/*.gql',
	generates: {
		'./src/graphql/generated-svelte.ts': {
			plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
			config: {
				clientPath: './client'
			}
		},
		'./src/graphql/generated.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request']
		}
	}
};
export default config;
