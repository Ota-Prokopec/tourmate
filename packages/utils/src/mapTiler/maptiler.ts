import * as maptiler from '@maptiler/client'

const defaultTypes: maptiler.ReverseGeocodingOptions['types'] = ['locality']

export const mapTiler = (apiKey: string) => {
	maptiler.config.apiKey = apiKey

	const reverseGeocoding = async (lat: number, long: number, { language = 'cs', limit = 1, types = defaultTypes }) => {
		const res = (
			await maptiler.geocoding.reverse([long, lat], {
				language,
				limit,
				types,
			})
		).features

		if (!res) throw new Error('maptiler geocoding did not work')
		return res
	}

	const fowardGeocoding = async (text: string, { limit = 10, lang = 'cs', fuzzyMatch = true, autocomplete = true }) => {
		const res = (await maptiler.geocoding.forward(text, { language: lang, limit: limit, fuzzyMatch, autocomplete })).features

		if (!res) throw new Error('maptiler geocoding did not work')
		return res
	}

	return { ...maptiler, reverseGeocoding, fowardGeocoding }
}
