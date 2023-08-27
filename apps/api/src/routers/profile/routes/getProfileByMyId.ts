import { protectedProcedure } from '$middlewares/isAuthed'
import { getUserProfileByMyId } from '@app/user-database-server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export type TGetProfileByMyIdOutputData = ReturnType<Awaited<typeof getUserProfileByMyId>>

export const getProfileByMyId = protectedProcedure.input(z.object({ myId: z.string() })).query(async ({ input, ctx }) => {
	try {
		return await getUserProfileByMyId(input.myId)
	} catch (error) {
		console.log(error)

		throw new TRPCError({ code: 'BAD_REQUEST' })
	}
})
