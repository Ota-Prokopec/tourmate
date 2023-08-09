import type { Experience, Location } from '@app/ts-types';
import { roundNumber } from '@app/utils';
import { isEqual } from 'lodash';

export const howManyExperiencesBefore = (
	experiences: Experience[],
	myLocation: Location,
	myIndex: number
) => {
	const experiencesLocations = experiences.map((exp) =>
		exp.location.map((xy) => roundNumber(xy, 4))
	) as Location[];

	const res = experiencesLocations.filter(
		(location, index) =>
			isEqual([roundNumber(myLocation[0], 4), roundNumber(myLocation[1], 4)], location) &&
			myIndex > index
	).length;

	return res;
};
