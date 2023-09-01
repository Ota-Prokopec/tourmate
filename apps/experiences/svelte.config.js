import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-vercel';

import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		env: {
			dir: '../../.env.development',
			publicPrefix: 'VITE_'
		},
		alias: {
			$lib: path.resolve('src', 'lib'),
			$root: path.resolve('/'),
			$src: path.resolve('src'),
			$routes: path.resolve('src', 'routes'),
			$server: path.resolve('src', 'lib/server')
		}
	}
};

export default config;
