import { z } from 'zod'

export const colorThemeZod = z.union([z.literal('dark'), z.literal('light')])

export const isColorTheme = (value: unknown): value is ColorTheme => {
	try {
		colorThemeZod.parse(value)
		return true
	} catch (error) {
		return false
	}
}

export type ColorTheme = z.infer<typeof colorThemeZod>
