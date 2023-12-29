import { Document, GraphqlDocument } from './Document'
import { z } from 'zod'

export const answerTypeZod = z.union([
	z.literal('radio'),
	z.literal('text'),
	z.literal('number'),
])
export type AnswerType = z.infer<typeof answerTypeZod>

export const isQuestionTypeRadio = (input: unknown): input is Question<'radio'> => {
	try {
		questionTypeRadioZod.parse(input)
		return true
	} catch (error) {
		return false
	}
}
export const isQuestionTypeNumber = (input: unknown): input is Question<'number'> => {
	try {
		questionTypeNumberZod.parse(input)
		return true
	} catch (error) {
		return false
	}
}
export const isQuestionTypeText = (input: unknown): input is Question<'text'> => {
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

export const isQuestion = (value: unknown) => {
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
	correctAnswer: z.string().min(1),
	pickingAnswers: z.string().array(),
})
const questionTypeNumberZod = z.object({
	question: z.string().min(1),
	type: z.literal('number'),
	correctAnswer: z.number(),
})
const questionTypeTextZod = z.object({
	question: z.string().min(1),
	type: z.literal('text'),
	correctAnswer: z.string().min(1),
})

type Skeleton<T extends AnswerType> = {
	question: string
	type: T
	correctAnswer: T extends 'number' ? number : string
	pickingAnswers?: string[] | undefined | null
}

export type Question<T extends AnswerType> = Skeleton<T> &
	(T extends 'radio'
		? {
				pickingAnswers: string[]
		  }
		: Skeleton<T>)

export type QuestionDocumentCreate = {
	question: string
	answerType: AnswerType
	answerId: string
}
export type QuestionDocument = Document<QuestionDocumentCreate>
export type QuestionGraphqlDocument = GraphqlDocument<QuestionDocumentCreate>
