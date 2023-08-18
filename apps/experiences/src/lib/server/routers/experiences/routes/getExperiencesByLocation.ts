import { protectedProcedure } from '$server/middlewares/isAuthed';
import { z } from 'zod';
import appwriteServer, { Models, Query } from '@app/appwrite-server';
import { locationZod } from '@app/ts-types';
import {
	numberTimingCoords,
	transformExperienceDocumentsIntoExperience
} from '@app/experience-database-server';

const zoomRange = 10;

export const getExperiencesByLocation = protectedProcedure
	.input(
		z.object({
			location: z.tuple([z.number(), z.number()]),
			zoom: z.number().min(1).max(40)
		})
	)
	.query(async ({ ctx, input }) => {
		const { collections, buckets } = appwriteServer.set(ctx.appwriteClients.user);

		const rangeLatitudeMax = Math.floor(
			(input.location[0] + zoomRange / input.zoom) * numberTimingCoords
		);
		const rangeLatitudeMin = Math.floor(
			(input.location[0] - zoomRange / input.zoom) * numberTimingCoords
		);
		const rangeLongitudeMax = Math.floor(
			(input.location[1] + zoomRange / input.zoom) * numberTimingCoords
		);
		const rangeLongitudeMin = Math.floor(
			(input.location[1] - zoomRange / input.zoom) * numberTimingCoords
		);

		try {
			const experienceDocuments = await collections.experience.listDocuments([]);
			const experiences = transformExperienceDocumentsIntoExperience(
				...experienceDocuments.documents
			);

			return experiences;
		} catch (error) {
			console.log(error);
		}
	});
