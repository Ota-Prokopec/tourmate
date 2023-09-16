declare namespace NodeJS {
	interface ProcessEnv {
		readonly APPWRITE_PROJECT_ID: string
		readonly APPWRITE_ENDPOINT: string
		readonly APPWRITE_API_KEY: string
		readonly CLIENT_HOSTNAME: string
		readonly SERVER_HOSTNAME: string
		readonly PRODUCTION_URL: string
		readonly MAP_TILER_API_KEY: string
		readonly FIREBASE_PROJECT_ID: string
		readonly VITE_FIREBASE_MESSAGING_VAPID_KEY: string
		readonly VITE_FIREBASE_API_KEY: string
		readonly EXPERIENCES_API_KEY: string
		readonly FIREBASE_PRIVATE_KEY: string
		readonly FIREBASE_CLIENT_EMAIL: string
		readonly CLOUDINARY_API_KEY: string
	}
}
