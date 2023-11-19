import { Document, GraphqlDocument } from './Document'

export type Question = {
	type: 'radio' | 'text' | 'number'
	answer: string | number
	pickingAnswers: string[] | undefined
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
