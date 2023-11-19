import { Document, GraphqlDocument } from './Document'
import { z } from 'zod'

export type QuestionType = 'radio' | 'text' | 'number'

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

export const getQuestionType = (question: Question<QuestionType>) => {
	if (isQuestionTypeText(question)) return ['text', question] as const
	if (isQuestionTypeNumber(question)) return ['number', question] as const
	if (isQuestionTypeRadio(question)) return ['radio', question] as const
	else throw new Error('Unknown type')
}

const questionTypeRadioZod = z.object({
	question: z.string().nonempty(),
	type: z.literal('radio'),
	answer: z.string().nonempty(),
	pickingAnswers: z.string().array(),
})
const questionTypeNumberZod = z.object({
	question: z.string().nonempty(),
	type: z.literal('number'),
	answer: z.number(),
})
const questionTypeTextZod = z.object({
	question: z.string().nonempty(),
	type: z.literal('text'),
	answer: z.string().nonempty(),
})

type Skeleton<T extends QuestionType> = {
	question: string
	type: T
	answer: T extends 'number' ? number : string
}

export type Question<T extends QuestionType> = {
	question: string
	type: T
	answer: T extends 'number' ? number : string
	pickingAnswers: T extends 'radio' ? string[] : undefined
}

export type QuestionTextForm = {
	question: string
	correctAnswer: string
}
export type QuestionTextFormDocument = Document<QuestionTextForm>
export type QuestionTextFormGraphqlDocument = GraphqlDocument<QuestionTextForm>
export type QuestionTextFormDocumentCreate = QuestionTextForm

export type QuestionNumberForm = {
	question: string
	correctAnswer: number
}
export type QuestionNumberFormDocument = Document<QuestionNumberForm>
export type QuestionNumberFormGraphqlDocument = GraphqlDocument<QuestionNumberForm>
export type QuestionNumberFormDocumentCreate = QuestionNumberForm

export type QuestionRadioForm = {
	question: string
	answers: string[]
	correctAnswer: string
}
export type QuestionRadioFormDocument = Document<QuestionRadioForm>
export type QuestionRadioFormGraphqlDocument = GraphqlDocument<QuestionRadioForm>
export type QuestionRadioFormDocumentCreate = QuestionRadioForm
