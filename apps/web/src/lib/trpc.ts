// lib/trpc/client.ts
import type { AppRouter } from '$lib/server/router';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import superjson from 'superjson';

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

export function trpc(init: TRPCClientInit) {
	const isBrowser = typeof window !== 'undefined';
	if (isBrowser && browserClient) return browserClient;
	const client = createTRPCClient<AppRouter>({ init });
	if (isBrowser) browserClient = client;
	return client;
}
