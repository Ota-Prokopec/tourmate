import { z } from 'zod'

export const envSchema = z.object({
	MAP_TILER_API_KEY: z.string(),
})

envSchema.parse(process.env)

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
