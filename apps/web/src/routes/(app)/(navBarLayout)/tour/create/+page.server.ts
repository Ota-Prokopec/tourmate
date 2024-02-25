import { sdkssr } from '$src/graphql/sdkssr';
import { PageServerLoad } from './$types';

export const ssr = false;

export const load: PageServerLoad = (event) => {};
