import type { LayoutLoad } from './$types';

export const ssr = false;

/**
 * load
 * @returns twoMonumentsDistanceLimit = 50meters
 */
export const load: LayoutLoad = () => {
	return {
		/**minimal distance of two monuments 50meters */
		twoMonumentsMinimalDistance: 50 as const
	};
};
