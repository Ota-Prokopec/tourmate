import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import path from 'path';

export default defineConfig({
	server: {
		host: 'localhost',
		port: 5222
	},
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, 'src', 'lib'),
			$root: path.resolve(__dirname),
			$src: path.resolve(__dirname, 'src'),
			$routes: path.resolve(__dirname, 'src', 'routes'),
			$server: path.resolve(__dirname, 'src', 'lib/server'),
			$stores: path.resolve(__dirname, 'src', 'lib', 'stores')
		}
	},
	optimizeDeps: {
		exclude: ['@urql/svelte']
	}
});
