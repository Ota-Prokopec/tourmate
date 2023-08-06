import { middleware, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const isAuthed = middleware(({ next, ctx }) => {
	console.log(ctx.user);

	if (!ctx.user || !ctx.appwriteClients.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx: {
			user: ctx.user,
			appwriteClients: {
				user: ctx.appwriteClients.user,
				admin: ctx.appwriteClients.admin
			}
		}
	});
});

export const protectedProcedure = publicProcedure.use(isAuthed);
