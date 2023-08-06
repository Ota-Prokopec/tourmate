import { accountRouter } from './routers/account/router';
import { router } from './trpc';
export const appRouter = router({
	account: accountRouter
});

// Export only the type of a router!
// This prevents us from importing servESNexter code on the client.
export type AppRouter = typeof appRouter;
