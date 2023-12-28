import { z } from 'zod'

export const languageZod = z.union([z.literal('en'), z.literal('cs')])

export const isLanguage = (value: unknown): value is Language => {
	try {
		languageZod.parse(value)
		return true
	} catch (error) {
		return false
	}
}

export type Language = z.infer<typeof languageZod>
