import type { Location } from '@app/ts-types';
import type { PageServerLoad } from './$types';
import { getDetailsByLatAndLong } from '@app/utils';
import { numberTimingCoords } from '@app/experience-database-server';
import { trpc } from '$lib/trpc';
import appwriteServer, { Query } from '@app/appwrite-server';
import { transformMonumentsDocumentsIntoMonuments } from '@app/experience-database-client/src/transformers';

export const load: PageServerLoad = async (event) => {
	const { monumentId } = event.params;
	const { collections } = await appwriteServer.setCookie(event.cookies.getAll());

	const monument = transformMonumentsDocumentsIntoMonuments(
		await collections.monument.getDocument(monumentId)
	)[0];

	const monumentCreator = await collections.userInfo.getDocument([
		Query.equal('userId', monument.creatorUserId)
	]);

	return {
		monument: {
			...monument,
			creator: monumentCreator
		}
	};
};
