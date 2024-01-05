import { Answer } from './Answer'
import { Document, GraphqlDocument } from './Document'
import { z } from 'zod'

export type CorrectAnswerType = string | number

export const answerTypeZod = z.union([
	z.literal('radio'),
	z.literal('text'),
	z.literal('number'),
])
export type AnswerType = z.infer<typeof answerTypeZod>

export const isQuestionTypeRadio = (
	input: unknown,
): input is z.infer<typeof questionTypeRadioZod> => {
	try {
		questionTypeRadioZod.parse(input)
		return true
	} catch (error) {
		return false
	}
}
export const isQuestionTypeNumber = (
	input: unknown,
): input is z.infer<typeof questionTypeNumberZod> => {
	try {
		questionTypeNumberZod.parse(input)
		return true
	} catch (error) {
		return false
	}
}
export const isQuestionTypeText = (
	input: unknown,
): input is z.infer<typeof questionTypeTextZod> => {
	try {
		questionTypeTextZod.parse(input)
		return true
	} catch (error) {
		return false
	}
}

export const getQuestionType = (question: unknown) => {
	if (isQuestionTypeText(question)) return ['text', question] as const
	if (isQuestionTypeNumber(question)) return ['number', question] as const
	if (isQuestionTypeRadio(question)) return ['radio', question] as const
	else throw new Error('Unknown type')
}

export const isQuestion = (value: unknown): value is Question => {
	try {
		getQuestionType(value)
		return true
	} catch (error) {
		return false
	}
}

const questionTypeRadioZod = z.object({
	question: z.string().min(1),
	type: z.literal('radio'),
	correctAnswer: z.string().min(1).optional().nullable(),
	pickingAnswers: z.string().array(),
})
const questionTypeNumberZod = z.object({
	question: z.string().min(1),
	type: z.literal('number'),
	correctAnswer: z.number().optional().nullable(),
})
const questionTypeTextZod = z.object({
	question: z.string().min(1),
	type: z.literal('text'),
	correctAnswer: z.string().min(1).optional().nullable(),
})

type Skeleton<T extends AnswerType> = {
	question: string
	type: T
	correctAnswer?: (T extends 'number' ? number : string) | undefined | null
	pickingAnswers?: string[] | undefined | null
}

export type Question = Omit<Skeleton<AnswerType>, 'pickingAnswers'> & {
	pickingAnswers?: Answer['pickingAnswers']
}

export type QuestionWithCorrectAnswerRequired = Question & {
	correctAnswer: CorrectAnswerType
}

export type QuestionDocumentCreate = {
	question: string
	answerType: AnswerType
	answerId: string
}
export type QuestionDocument = Document<QuestionDocumentCreate>
export type QuestionGraphqlDocument = GraphqlDocument<QuestionDocumentCreate>
