import { z } from 'zod'

export const envSchema = z.object({
	APPWRITE_PROJECT_ID: z.string(),
	APPWRITE_ENDPOINT: z.string(),
})

envSchema.parse(process.env)

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
