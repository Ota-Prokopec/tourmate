import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    APPWRITE_PROJECT_ID: z.ZodString;
    APPWRITE_ENDPOINT: z.ZodString;
    APPWRITE_API_KEY: z.ZodString;
    FIREBASE_MESSAGING_VAPID_KEY: z.ZodString;
    FIREBASE_API_KEY: z.ZodString;
    FIREBASE_PRIVATE_KEY: z.ZodString;
    FIREBASE_PROJECT_ID: z.ZodString;
    FIREBASE_CLIENT_EMAIL: z.ZodString;
}, "strip", z.ZodTypeAny, {
    APPWRITE_PROJECT_ID: string;
    APPWRITE_ENDPOINT: string;
    APPWRITE_API_KEY: string;
    FIREBASE_MESSAGING_VAPID_KEY: string;
    FIREBASE_API_KEY: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
}, {
    APPWRITE_PROJECT_ID: string;
    APPWRITE_ENDPOINT: string;
    APPWRITE_API_KEY: string;
    FIREBASE_MESSAGING_VAPID_KEY: string;
    FIREBASE_API_KEY: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
}>;
declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {
        }
    }
}
//# sourceMappingURL=env.d.ts.map