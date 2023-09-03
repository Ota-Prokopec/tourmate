// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { Client, Models } from 'node-appwrite';

declare global {
	namespace App {
		interface Error {
			code: number;
			message: string;
		}
		interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
