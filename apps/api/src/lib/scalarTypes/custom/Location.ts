import { isLocation } from '@app/ts-types'
import { scalarType } from 'nexus'
import { Location } from '@app/ts-types'

export default scalarType({
	name: 'Location',
	asNexusMethod: 'location',
	sourceType: '[number, number]',
	deprecation: '[number, number]',

	serialize: (outputValue: unknown) => {
		if (!isLocation(outputValue)) return null
		return JSON.stringify(outputValue)
	},
	parseValue: (inputValue: unknown) => {
		if (typeof inputValue !== 'string') throw new TypeError('input has to be a string')
		const potencialLocation: Location | any = JSON.parse(inputValue)
		if (!isLocation(potencialLocation)) throw new TypeError('input has to be type Location')
		return potencialLocation
	},
})
