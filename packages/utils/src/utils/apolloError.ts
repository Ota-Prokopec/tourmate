import { z } from 'zod'

const zodSchema = z.object({
	response: z.object({
		errors: z.array(
			z.object({
				message: z.string(),
				extensions: z.object({
					code: z.string(),
				}),
			}),
		),
	}),
})

export const parseApolloError = (response: unknown) => {
	return zodSchema.parse(response)
}
