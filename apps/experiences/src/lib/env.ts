import { z } from 'zod';

export const envSchema = z.object({
	APPWRITE_PROJECT_ID: z.string(),
	APPWRITE_ENDPOINT: z.string(),
	APPWRITE_API_KEY: z.string(),
	HOSTNAME: z.string(),
	MAPBOX_API_KEY: z.string()
});

envSchema.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
