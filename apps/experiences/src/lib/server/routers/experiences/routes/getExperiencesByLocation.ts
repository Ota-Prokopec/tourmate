import { protectedProcedure } from '$server/middlewares/isAuthed';
import { z } from 'zod';
import appwriteServer, { Models, Query } from '@app/appwrite-server';
import { locationZod } from '@app/ts-types';
import {
	numberTimingCoords,
	transformExperienceDocumentIntoExperience
} from '@app/experience-database-server';

const zoomRange = 1 / 14;

export const getExperiencesByLocation = protectedProcedure
	.input(
		z.object({
			location: locationZod,
			zoom: z.number().min(1).max(40)
		})
	)
	.query(async ({ ctx, input }) => {
		const { collections, buckets } = appwriteServer.set(ctx.appwriteClients.user);

		const rangeLatitudeMax = Math.floor((input.location[0] + zoomRange) * numberTimingCoords);
		const rangeLatitudeMin = Math.floor((input.location[0] - zoomRange) * numberTimingCoords);
		const rangeLongitudeMax = Math.floor((input.location[1] + zoomRange) * numberTimingCoords);
		const rangeLongitudeMin = Math.floor((input.location[1] - zoomRange) * numberTimingCoords);

		const experienceDocuments = await collections.experience.listDocuments([
			Query.lessThan('latitude', rangeLatitudeMax),
			Query.greaterThan('latitude', rangeLatitudeMin),
			Query.lessThan('longitude', rangeLongitudeMax),
			Query.greaterThan('longitude', rangeLongitudeMin)
		]);
		const experiences = transformExperienceDocumentIntoExperience(
			...experienceDocuments.documents
		);

		return experiences;
	});
