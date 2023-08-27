import { protectedProcedure } from '$middlewares/isAuthed'
import { z } from 'zod'
import { locationZod } from '@app/ts-types'
import appwriteServer, { Query } from '@app/appwrite-server'

export const getExperiencesByUser = protectedProcedure
	.input(
		z.object({
			userId: z.string(),
		}),
	)
	.query(async ({ ctx, input }) => {
		const { collections } = appwriteServer.set(ctx.appwriteClients.user)
		const experiences = await collections.experience.listDocuments([Query.equal('userId', input.userId), Query.limit(100)])

		return experiences.documents
	})
