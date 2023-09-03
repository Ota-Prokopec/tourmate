import { protectedProcedure } from '$server/middlewares/isAuthed';
import { z } from 'zod';
import { locationZod } from '@app/ts-types';
import appwriteServer, { Query } from '@app/appwrite-server';
import { transformExperienceDocumentsIntoExperience } from '@app/experience-database-server/src/transformers';

export const getExperiencesByUserByMyId = protectedProcedure
	.input(
		z.object({
			myId: z.string()
		})
	)
	.query(async ({ ctx, input }) => {
		const { collections } = appwriteServer.set(ctx.appwriteClients.user);

		const userId = (await collections.userInfo.getDocument([Query.equal('myId', input.myId)]))
			.userId;
		const experiences = await collections.experience.listDocuments([
			Query.equal('userId', userId),
			Query.limit(100)
		]);

		return transformExperienceDocumentsIntoExperience(...experiences.documents);
	});
