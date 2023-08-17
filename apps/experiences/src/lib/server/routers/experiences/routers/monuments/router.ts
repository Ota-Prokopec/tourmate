import { getMonumentsByLocation } from './routes/getMonumentsByLocation';
import { router } from '../../../../trpc';
import { createMonument } from './routes/createMonument';

export const monumentsRouter = router({
	getListByLocation: getMonumentsByLocation,
	create: createMonument
});

// Export only the type of a router!
// This prevents us from importing servESNexter code on the client.
export type AppRouter = typeof monumentsRouter;
