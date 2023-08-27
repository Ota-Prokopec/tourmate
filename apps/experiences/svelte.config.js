import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		outDir: '.svelte-kit',
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below

			pages: '.svelte-kit',
			assets: '.svelte-kit',
			fallback: null,
			precompress: false,
			strict: true
		}),
		env: {
			dir: '../../.env.development',
			publicPrefix: 'VITE_'
		},
		alias: {
			$lib: path.resolve('src', 'lib'),
			$root: path.resolve('/'),
			$src: path.resolve('src'),
			$routes: path.resolve('src', 'routes'),
			$server: path.resolve('src', 'lib/server'),
			$api: path.resolve('../', 'api')
		},
		files: {
			serviceWorker: 'src/firebase-messaging-sw.js'
		},
		prerender: {
			handleHttpError: () => {}
		}
	}
};

export default config;
