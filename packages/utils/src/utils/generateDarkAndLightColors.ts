export const getDarkAndLightColors = () => ({
	light: lightColors,
	dark: darkColors,
})

const lightColors = [
	'rgba(255, 255, 255, 1)', // White
	'rgba(240, 248, 255, 1)', // AliceBlue
	'rgba(255, 228, 196, 1)', // Bisque
	'rgba(255, 250, 205, 1)', // LemonChiffon
	'rgba(240, 255, 240, 1)', // Honeydew
	'rgba(245, 245, 220, 1)', // Beige
	'rgba(255, 255, 240, 1)', // Ivory
	'rgba(255, 240, 245, 1)', // LavenderBlush
	'rgba(240, 255, 255, 1)', // Azure
	'rgba(250, 240, 230, 1)', // Linen
	'rgba(255, 250, 240, 1)', // FloralWhite
	'rgba(255, 239, 219, 1)', // Seashell
	'rgba(255, 245, 238, 1)', // MistyRose
	'rgba(255, 228, 225, 1)', // Pink
	'rgba(245, 255, 250, 1)', // MintCream
	'rgba(240, 255, 240, 1)', // Honeydew
	'rgba(250, 235, 215, 1)', // AntiqueWhite
	'rgba(255, 222, 173, 1)', // NavajoWhite
	'rgba(255, 250, 250, 1)', // Snow
	'rgba(245, 255, 250, 1)', // MintCream
	'rgba(255, 248, 220, 1)', // Cornsilk
	'rgba(255, 235, 205, 1)', // BlanchedAlmond
	'rgba(255, 228, 196, 1)', // Bisque
	'rgba(255, 255, 240, 1)', // Ivory
	'rgba(255, 250, 205, 1)', // LemonChiffon
] as const

const darkColors = [
	'rgba(128, 0, 0, 1)', // Maroon
	'rgba(0, 128, 128, 1)', // Teal
	'rgba(0, 0, 128, 1)', // Navy
	'rgba(128, 128, 0, 1)', // Olive
	'rgba(139, 0, 0, 1)', // Dark Red
	'rgba(139, 69, 19, 1)', // SaddleBrown
	'rgba(139, 69, 139, 1)', // DarkMagenta
	'rgba(0, 139, 139, 1)', // DarkCyan
	'rgba(128, 0, 0, 0.5)', // Semitransparent Maroon
	'rgba(0, 128, 0, 0.5)', // Semitransparent Dark Green
	'rgba(0, 0, 128, 0.5)', // Semitransparent Navy
	'rgba(128, 0, 0, 0.7)', // Transparent Maroon
	'rgba(0, 128, 0, 0.7)', // Transparent Dark Green
	'rgba(0, 0, 128, 0.7)', // Transparent Navy
	'rgba(128, 0, 0, 0.3)', // Very Transparent Maroon
	'rgba(0, 128, 0, 0.3)', // Very Transparent Dark Green
	'rgba(0, 0, 128, 0.3)', // Very Transparent Navy
] as const
