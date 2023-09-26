// @ts-nocheck
import type { PageServerLoad } from './$types';
import { Preferences } from '@app/ts-types';
import appwrite from '@app/appwrite-ssr-experiences';
import { sdkssr } from '$src/graphql/sdkssr';
import { sdk } from '$src/graphql/sdk';

export const load = async (event: Parameters<PageServerLoad>[0]) => {
	const { account, locale } = await appwrite.setCookie(event.cookies.getAll());

	const location = (await account.getPrefs<Preferences>()).location ?? (await locale.getLocation());

	const res = await sdkssr(
		event
	).getListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonuments({
		input: {
			location: location,
			zoom: 14
		}
	});

	const experiences = res.getListOfExperiences;
	const monuments = res.getListOfMonuments;

	return { loadedExperiences: experiences, loadedMonuments: monuments };
};
