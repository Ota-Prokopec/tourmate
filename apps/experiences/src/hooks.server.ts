// hooks.server.ts
import { error, json, type Handle, redirect, HandleServerError } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { createContext } from './lib/server/trpc';
import { appRouter } from '$lib/server/router';
import { goto } from '$app/navigation';

export const handle = createTRPCHandle({
	router: appRouter,
	createContext,
	onError(opts) {
		console.log(opts.error);
	}
});
