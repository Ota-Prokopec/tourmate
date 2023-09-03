import { accountRouter } from './routers/account/router';
import { experienceRouter } from './routers/experiences/router';
import { profileRouter } from './routers/profile/router';
import { router } from './trpc';
export const appRouter = router({
	account: accountRouter,
	experience: experienceRouter,
	profile: profileRouter
});

// Export only the type of a router!
// This prevents us from importing servESNexter code on the client.
export type AppRouter = typeof appRouter;
