import * as z from 'zod'

const envSchema = z.object({
	APPWRITE_PROJECT_ID: z.string(),
	APPWRITE_ENDPOINT: z.string(),
	HOSTNAME: z.string(),
	API_KEY: z.string(),
})

let env = envSchema.parse(process.env)
