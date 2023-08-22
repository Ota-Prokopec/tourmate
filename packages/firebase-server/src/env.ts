import { z } from 'zod'

export const envSchema = z.object({
	APPWRITE_PROJECT_ID: z.string(),
	APPWRITE_ENDPOINT: z.string(),
	APPWRITE_API_KEY: z.string(),
	FIREBASE_MESSAGING_VAPID_KEY: z.string(),
	FIREBASE_API_KEY: z.string(),
	FIREBASE_PRIVATE_KEY: z.string(),
	FIREBASE_PROJECT_ID: z.string(),
	FIREBASE_CLIENT_EMAIL: z.string(),
})

envSchema.parse(process.env)

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
