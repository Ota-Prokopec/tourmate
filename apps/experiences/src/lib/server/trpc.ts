import type { RequestEvent } from '@sveltejs/kit';
import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server';
import appwriteServer from '@app/appwrite-server';
import { AppwriteException } from 'appwrite';

export const createContext = async (event: RequestEvent) => {
	const { client: adminAppwriteClient } = appwriteServer.setAdmin();

	try {
		const { account, client } = await appwriteServer.setCookie(event.cookies.getAll());

		const user = await account.get();

		return {
			user: user, //this is an annonymous user
			appwriteClients: {
				admin: adminAppwriteClient,
				user: client
			},
			...event
		};
	} catch (error) {
		if (error instanceof AppwriteException) {
			if (error.code === 429) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
		}

		return {
			user: null, //this is an annonymous user
			appwriteClients: {
				admin: adminAppwriteClient,
				user: null
			},
			...event
		};
	}
};

type Context = inferAsyncReturnType<typeof createContext>;
export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
