import { isTopic } from '@app/utils'
import { scalarType } from 'nexus'

export default scalarType({
	name: 'Topic',
	asNexusMethod: 'topic',
	sourceType: '"castle" | "monument" | "person" | "animals" | "hiking"',
	deprecation: '"castle" | "monument" | "person" | "animals" | "hiking"',

	serialize: (outputValue: unknown) => {
		if (!isTopic(outputValue)) throw new TypeError('input has to be type Topic')
		return outputValue
	},
	parseValue: (inputValue: unknown) => {
		if (!isTopic(inputValue)) throw new TypeError('input has to be type Topic')
		return inputValue
	},
	parseLiteral: (valueNode: unknown) => {
		if (!isTopic(valueNode)) throw new TypeError('input has to be type Topic')
		return valueNode
	},
})
