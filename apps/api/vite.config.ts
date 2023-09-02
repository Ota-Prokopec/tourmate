import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
	server: {
		port: 4444,
	},
	plugins: [
		...VitePluginNode({
			adapter: 'express',
			appPath: './src/index.ts',
		}),
	],
})
