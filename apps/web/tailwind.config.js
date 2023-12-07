/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{html,svelte,js,ts}',
		'../../node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			spacing: {
				bottomNavBarHeightSize: 'var(--bottom-navbar-height)'
			},
			animation: {
				cardShrinking: 'cardShrinking 2s linear',
				bouncing: 'bouncing 1s linear',
				bounce: 'bounce 1s linear',
				scale: 'scale 1s infinite'
			},
			keyframes: {
				rotate45deg: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(45deg)' }
				},
				cardShrinking: {
					'0%': { transform: 'scale(1) rotate(0deg)' },
					'100%': { transform: 'scale(0.1) rotate(25deg)' }
				},
				bouncing: {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
					'100%': { transform: 'translateY(0px)' }
				},
				scale: {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(2)' }
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
		},
		colors: {}
	},
	plugins: [
		require('flowbite/plugin'),
		//		require('daisyui'),
		function ({ addVariant }) {
			addVariant('child', '& > *');
			addVariant('child-hover', '& > *:hover');
		}
	],
	darkMode: 'class'
};
