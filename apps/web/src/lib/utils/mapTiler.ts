import { PUBLIC_MAP_TILER_API_KEY } from '$env/static/public';
import { locale } from '$src/i18n/i18n-svelte';

import * as maptiler from '@maptiler/client';
import { get } from 'svelte/store';
const defaultTypes: maptiler.ReverseGeocodingOptions['types'] = ['locality'];

const mapTiler = (apiKey: string) => {
	maptiler.config.apiKey = apiKey;

	const reverseGeocoding = async (
		lat: number,
		long: number,
		{ language = get(locale), limit = 1, types = defaultTypes }
	) => {
		const res = (
			await maptiler.geocoding.reverse([long, lat], {
				language,
				limit,
				types
			})
		).features;

		if (!res) throw new Error('maptiler geocoding did not work');
		return res;
	};

	const fowardGeocoding = async (
		text: string,
		{ limit = 10, lang = get(locale), fuzzyMatch = true, autocomplete = true }
	) => {
		const res = (
			await maptiler.geocoding.forward(text, {
				language: lang,
				limit: limit,
				fuzzyMatch,
				autocomplete
			})
		).features;

		if (!res) throw new Error('maptiler geocoding did not work');
		return res;
	};

	return { ...maptiler, reverseGeocoding, fowardGeocoding };
};

export default mapTiler(PUBLIC_MAP_TILER_API_KEY);
