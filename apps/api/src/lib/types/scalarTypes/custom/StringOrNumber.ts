import { scalarType } from 'nexus'

export default scalarType({
	name: 'StringOrNumber',
	asNexusMethod: 'stringOrNumber',
	sourceType: 'string | number',
	deprecation: 'string | number',

	serialize: (outputValue: unknown) => {
		if (typeof outputValue !== 'string' && typeof outputValue !== 'number')
			throw new TypeError('input has to be type string|number')

		return outputValue
	},
	parseValue: (inputValue: unknown) => {
		if (typeof inputValue !== 'string' && typeof inputValue !== 'number')
			throw new TypeError('input has to be type string|number')

		return inputValue
	},
	parseLiteral: (valueNode: unknown) => {
		if (typeof valueNode !== 'string' && typeof valueNode !== 'number')
			throw new TypeError('input has to be type string|number')

		return valueNode
	},
})
