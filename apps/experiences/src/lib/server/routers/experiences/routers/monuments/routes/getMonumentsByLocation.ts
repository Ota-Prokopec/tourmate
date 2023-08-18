import { protectedProcedure } from '$server/middlewares/isAuthed';
import { z } from 'zod';
import appwriteServer, { Query } from '@app/appwrite-server';
import { numberTimingCoords } from '@app/experience-database-server';
import { transformMonumentsDocumentsIntoMonuments } from '@app/experience-database-client/src/transformers';

const zoomRange = 1 / 20;

export const getMonumentsByLocation = protectedProcedure
	.input(
		z.object({
			location: z.tuple([z.number(), z.number()]),
			zoom: z.number().min(1).max(40)
		})
	)
	.query(async ({ ctx, input }) => {
		const { collections } = appwriteServer.set(ctx.appwriteClients.user);

		const rangeLatitudeMax = Math.floor(
			(input.location[0] + zoomRange * input.zoom) * numberTimingCoords
		);
		const rangeLatitudeMin = Math.floor(
			(input.location[0] - zoomRange * input.zoom) * numberTimingCoords
		);
		const rangeLongitudeMax = Math.floor(
			(input.location[1] + zoomRange * input.zoom) * numberTimingCoords
		);
		const rangeLongitudeMin = Math.floor(
			(input.location[1] - zoomRange * input.zoom) * numberTimingCoords
		);

		const MonumentDocuments = await collections.monument.listDocuments([
			Query.lessThan('latitude', rangeLatitudeMax),
			Query.greaterThan('latitude', rangeLatitudeMin),
			Query.lessThan('longitude', rangeLongitudeMax),
			Query.greaterThan('longitude', rangeLongitudeMin)
		]);

		const monuments = transformMonumentsDocumentsIntoMonuments(...MonumentDocuments.documents);

		return monuments;
	});
