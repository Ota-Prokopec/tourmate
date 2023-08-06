import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, 'src', 'lib'),
			$root: path.resolve(__dirname),
			$src: path.resolve(__dirname, 'src'),
			$routes: path.resolve(__dirname, 'src', 'routes'),
			$stores: path.resolve(__dirname, 'src', 'lib', 'stores'),
		},
	},
	plugins: [
		svelte({
			preprocess: preprocess({
				scss: true,
				postcss: true,
			}),
		}),
	],
})
