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
		readonly CLOUDINARY_CLOUD_NAME: string
		readonly CLOUDINARY_API_SECRET_KEY: string
		readonly DEV: string
		readonly SERVER_HOSTNAME_COOKIES: string
		readonly PUBLIC_SESSION: string
		readonly TESTING_SESSION: string
		readonly TESTING_SESSION_NAME: string
		readonly PUBLIC_SESSION_NAME: string
		readonly CLIENT_HOSTNAME_COOKIES: string
		readonly PUBLIC_MAX_IMAGE_SIZE_IN_MB: string
		readonly CLOUDINARY_ROOT_FOLDER_NAME: string
		readonly FIREBASE_PRIVATE_KEY_ID: string
		readonly IOS_AUTHORIZATION_HEADER_NAME: string
	}
}
