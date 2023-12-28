import { isColorTheme } from '@app/ts-types'
import { scalarType } from 'nexus'

export default scalarType({
	name: 'ColorTheme',
	asNexusMethod: 'colorTheme',
	sourceType: '"dark" | "light"',
	deprecation: '"dark" | "light"',

	serialize: (outputValue: unknown) => {
		if (!isColorTheme(outputValue)) throw new TypeError('input has to be type ColorTheme')
		return outputValue
	},
	parseValue: (inputValue: unknown) => {
		if (!isColorTheme(inputValue)) throw new TypeError('input has to be type ColorTheme')
		return inputValue
	},
	parseLiteral: (valueNode: unknown) => {
		if (!isColorTheme(valueNode)) throw new TypeError('input has to be type ColorTheme')
		return valueNode
	},
})
