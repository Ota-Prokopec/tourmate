import { protectedProcedure } from '$lib/server/middlewares/isAuthed';
import { publicProcedure } from '$lib/server/trpc';
import { getUserProfileByUserId } from '@app/user-database-server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export type TGetProfileOutputData = ReturnType<Awaited<typeof getUserProfileByUserId>>;

export const getProfile = protectedProcedure
	.input(z.object({ userId: z.string() }))
	.query(async ({ input, ctx }) => {
		try {
			return await getUserProfileByUserId(input.userId);
		} catch (error) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}
	});
