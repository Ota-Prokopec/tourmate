import { isLocation } from '@app/utils'
import { scalarType } from 'nexus'

export default scalarType({
	name: 'Location',
	asNexusMethod: 'location',
	sourceType: '[number, number]',
	deprecation: '[number, number]',

	serialize: (outputValue: unknown) => {
		if (!isLocation(outputValue)) throw new TypeError('input has to be type Location')
		return outputValue
	},
	parseValue: (inputValue: unknown) => {
		if (!isLocation(inputValue)) throw new TypeError('input has to be type Location')
		return inputValue
	},
	parseLiteral: (valueNode: unknown) => {
		if (!isLocation(valueNode)) throw new TypeError('input has to be type Location')
		return valueNode
	},
})
