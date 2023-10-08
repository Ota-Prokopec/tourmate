import type { PageServerLoad } from './$types';
import { Preferences } from '@app/ts-types';
import { sdkssr } from '$src/graphql/sdkssr';
import { sdk } from '$src/graphql/sdk';

export const load: PageServerLoad = async (event) => {};
