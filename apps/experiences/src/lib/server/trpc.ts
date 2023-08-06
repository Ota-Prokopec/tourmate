import type { RequestEvent } from '@sveltejs/kit';
import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server';
import appwriteServer, { adminAppwriteClient } from '@app/appwrite-server';
import { AppwriteException } from 'appwrite';

export const createContext = async (event: RequestEvent) => {
	console.log(event.url.pathname);

	try {
		const sessionNames = [
			'a_session_' + process.env.APPWRITE_PROJECT_ID?.toLowerCase(),
			'a_session_' + process.env.APPWRITE_PROJECT_ID?.toLowerCase() + '_legacy'
		];

		const session =
			event.cookies.get(sessionNames[0]) ?? event.cookies.get(sessionNames[1]) ?? '';

		const { account: accountAsNobody } = appwriteServer.none();
		const { jwt } = await accountAsNobody.createJwtWithSession(session);

		console.log(jwt);

		const { client, account } = appwriteServer.setJWT(jwt);
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
		console.log(error);
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
