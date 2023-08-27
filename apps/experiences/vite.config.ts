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
	resolve: {}
});
