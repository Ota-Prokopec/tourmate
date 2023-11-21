import { answerTypeZod } from '@app/ts-types'
import { scalarType } from 'nexus'

export default scalarType({
	name: 'AnswerType',
	asNexusMethod: 'answerType',
	sourceType: "'radio' | 'text' | 'number'",
	deprecation: "'radio' | 'text' | 'number'",

	serialize: (outputValue: unknown) => {
		answerTypeZod.parse(outputValue)
		return outputValue
	},
	parseValue: (inputValue: unknown) => {
		answerTypeZod.parse(inputValue)
		return inputValue
	},
	parseLiteral: (valueNode: unknown) => {
		answerTypeZod.parse(valueNode)
		return valueNode
	},
})
