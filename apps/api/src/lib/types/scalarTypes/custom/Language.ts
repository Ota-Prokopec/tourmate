import { isLanguage } from '@app/ts-types'
import { scalarType } from 'nexus'

export default scalarType({
	name: 'Language',
	asNexusMethod: 'language',
	sourceType: '"en" | "cs"',
	deprecation: '"en" | "cs"',

	serialize: (outputValue: unknown) => {
		if (!isLanguage(outputValue)) throw new TypeError('input has to be type Language')
		return outputValue
	},
	parseValue: (inputValue: unknown) => {
		if (!isLanguage(inputValue)) throw new TypeError('input has to be type Language')
		return inputValue
	},
	parseLiteral: (valueNode: unknown) => {
		if (!isLanguage(valueNode)) throw new TypeError('input has to be type Language')
		return valueNode
	},
})
