import type { LayoutServerLoad } from './$types';
import { sdkssr } from '$src/graphql/sdkssr';
import { error } from '@sveltejs/kit';
import { MonumentCard, getQuestionType, isQuestion } from '@app/ts-types';

export const ssr = false;

export const load: LayoutServerLoad = async (event) => {
	const { monumentId } = event.params;

	const monument = (
		await sdkssr(event).getMonumentCardWithConnectedExperiences({
			id: monumentId
		})
	).getMonument;

	return {
		monument: monument
	};
};
