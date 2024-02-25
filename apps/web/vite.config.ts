import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import path from 'path';

export default defineConfig({
	server: {
		host: 'localhost',
		port: 5222
	},
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['typesafe-i18n']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		globals: true,
		watch: false
	},
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, 'src', 'lib'),
			$root: path.resolve(__dirname),
			$src: path.resolve(__dirname, 'src'),
			$routes: path.resolve(__dirname, 'src', 'routes'),
			'@': path.resolve(__dirname, './src')
		}
	},
	optimizeDeps: {
		exclude: ['@urql/svelte']
	}
});
