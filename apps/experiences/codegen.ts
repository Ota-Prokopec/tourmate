import type { CodegenConfig } from '@graphql-codegen/cli';
import { resolve } from 'path';

const config: CodegenConfig = {
	schema: '../api/src/generated/schema.graphql',
	documents: './src/**/*.gql',
	generates: {
		'./src/graphql/generated.ts': {
			plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
			config: {
				clientPath: './client'
			}
		}
	}
};
export default config;
