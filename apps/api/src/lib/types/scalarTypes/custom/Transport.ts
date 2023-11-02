import { isTopic, isTransport } from '@app/utils'
import { scalarType } from 'nexus'

export default scalarType({
	name: 'Transport',
	asNexusMethod: 'transport',
	sourceType: '"train" | "bus" | "car" | "walk" | "bike"',
	deprecation: '"train" | "bus" | "car" | "walk" | "bike"',

	serialize: (outputValue: unknown) => {
		if (!isTransport(outputValue)) throw new TypeError('input has to be type Transport')
		return outputValue
	},
	parseValue: (inputValue: unknown) => {
		if (!isTransport(inputValue)) throw new TypeError('input has to be type Transport')
		return inputValue
	},
	parseLiteral: (valueNode: unknown) => {
		if (!isTransport(valueNode)) throw new TypeError('input has to be type Transport')
		return valueNode
	},
})
