import { isLocation } from '@app/ts-types'
import { Kind } from 'graphql'
import { scalarType } from 'nexus'

export default scalarType({
	name: 'Location',
	asNexusMethod: 'location',
	serialize: (outputValue) => {
		if (!isLocation(outputValue)) throw new TypeError('Location is not valid')
		return JSON.stringify(outputValue)
	},
	parseValue: (inputValue) => {
		if (typeof inputValue !== 'string') throw new TypeError('input value is not a string')
		const location = JSON.parse(inputValue)
		if (!isLocation(location)) throw new TypeError('Location is not valid')
		return location
	},
	parseLiteral: (valueNode) => {
		if (valueNode.kind !== Kind.LIST) return null
		if (valueNode.values.length !== 2) return null
		if (typeof valueNode.values[0] !== 'number' || typeof valueNode.values[0] !== 'number') return null
		return valueNode.loc
	},
})
