import pkg from './package.json' assert { type: 'json' }
import typescript from '@rollup/plugin-typescript'

export default {
	external: Object.keys(pkg.dependencies),
	input: './src/index.ts',
	plugins: [typescript()],
	output: [
		{
			format: 'cjs',
			file: pkg.main,
			esModule: false,
			sourcemap: true,
		},
		{
			format: 'es',
			file: pkg.module,
			sourcemap: true,
		},
	],
}
