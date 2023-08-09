import { protectedProcedure } from '$server/middlewares/isAuthed';
import { z } from 'zod';
import appwriteServer, { Permission, permissions } from '@app/appwrite-server';
import { experienceDocumentCreateZod } from '@app/ts-types';
import { isBase64 } from '@app/utils';
import { numberTimingCoords } from '@app/experience-database-server';

export const createExperience = protectedProcedure
	.input(
		z.object({
			imgSrc: z.string(),
			location: z.tuple([z.number(), z.number()])
		})
	)
	.mutation(async ({ ctx, input }) => {
		const { collections, buckets } = appwriteServer.set(ctx.appwriteClients.user);
		if (!isBase64(input.imgSrc)) return;

		const document = await buckets.experiencesPictures
			.createFile(input.imgSrc, [
				...permissions.readAny(),
				...permissions.owner(ctx.user.$id)
			])
			.then(async (file) => {
				const imgSrc = buckets.experiencesPictures.getFileURL(file.$id);
				return await collections.experience.createDocument({
					userId: ctx.user.$id,
					imgSrc: imgSrc,
					latitude: input.location[0] * numberTimingCoords,
					longitude: input.location[1] * numberTimingCoords
				});
			});

		return document;
	});
