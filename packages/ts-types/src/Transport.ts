import { z } from 'zod'

export const transportZod = z.union([
	z.literal('train'),
	z.literal('bus'),
	z.literal('car'),
	z.literal('walk'),
	z.literal('bike'),
])

export type Transport = z.infer<typeof transportZod>
