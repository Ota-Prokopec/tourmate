// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="svelte-gestures" />
/// <reference types="@sveltejs/kit" />

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
