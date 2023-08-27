import { defineConfig } from 'vitest/config'
import { VitePluginNode } from 'vite-plugin-node'

import path from 'path'

export default defineConfig({
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	server: {
		port: 4444,
	},
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, 'src', 'lib'),
			$root: path.resolve(__dirname),
			$src: path.resolve(__dirname, 'src'),
			$routes: path.resolve(__dirname, 'src', 'routes'),
			$middlewares: path.resolve(__dirname, 'src', 'middlewares'),
		},
	},
	plugins: [
		...VitePluginNode({
			adapter: 'express',

			appPath: './src/index.ts',

			exportName: 'viteNodeApp',

			tsCompiler: 'esbuild',
		}),
	],
})
