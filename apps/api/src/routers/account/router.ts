import { router } from '../../trpc';
import { get } from './routes/get';
import { deleteAccount } from './routes/deleteAccount';
import { createAccount } from './routes/createAccount';

export const accountRouter = router({
	create: createAccount,
	delete: deleteAccount,
	get: get
});

// Export only the type of a router!
// This prevents us from importing servESNexter code on the client.
export type AppRouter = typeof accountRouter;
