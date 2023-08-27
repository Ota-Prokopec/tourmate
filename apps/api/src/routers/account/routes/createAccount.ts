import { protectedProcedure } from '$middlewares/isAuthed'
import { z } from 'zod'
import appwriteSveltekitSSR, { permissions } from '@app/appwrite-server'
import type { Document } from '@app/ts-types'

export const createAccount = protectedProcedure.input(z.object({ myId: z.string() })).mutation(async ({ ctx, input }) => {
	const { collections } = appwriteSveltekitSSR.set(ctx.appwriteClients.user)

	const [account] = await Promise.all([
		//create user-info document
		collections.userInfo.createDocument(
			{
				userId: ctx.user.$id,
				username: ctx.user.name,
				myId: input.myId, // quiziId will be quiziId, but if not already chosen, it is at facebook or google => it will be userId
			},
			[...permissions.readAny(), ...permissions.owner(ctx.user.$id)],
		),
	])

	console.log(account)

	return account
})
