/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{html,svelte,js,ts}',
		'../../node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			animation: {
				cardShrinking: 'cardShrinking 2s linear'
			},
			keyframes: {
				rotate45deg: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(45deg)' }
				},
				cardShrinking: {
					'0%': { transform: 'scale(1) rotate(0deg)' },
					'100%': { transform: 'scale(0.1) rotate(25deg)' }
				}
			}
		},
		screens: {
			mobile: { max: '640px' },
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px'
			// => @media (min-width: 1536px) { ... }
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
