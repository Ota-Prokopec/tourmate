import { z } from 'zod'

export const topicZod = z.union([
	z.literal('castle'),
	z.literal('monument'),
	z.literal('person'),
	z.literal('animals'),
	z.literal('hiking'),
	z.literal(null),
])

export type Topic = z.infer<typeof topicZod>
