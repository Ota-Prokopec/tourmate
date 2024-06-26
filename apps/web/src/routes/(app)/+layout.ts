import { browser } from '$app/environment';
import { collections } from '$lib/appwrite/appwrite';
import type { LayoutLoad } from './$types';
import lodash from 'lodash';
import { appwriteKeys } from '@app/appwrite-client';
import { storage } from '$lib/utils/lsStore';
import { watchUsersLocation } from '@app/utils';

export const load: LayoutLoad = (event) => {
	const data = event.data;

	if (!browser) return event.data; // only the browser side

	// real-time users current loacation update
	watchUsersLocation(
		async (location) => {
			storage.usersLocation = location; // save location into store and localstorage
		},
		{ enableHighAccuracy: false }
	);

	// notifications token

	return event.data;
};
