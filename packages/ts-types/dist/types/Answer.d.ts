import { Document, GraphqlDocument } from './Document';
export type TextTypeAnswer = {
    correctAnswer: string;
};
export type TextTypeAnswerDocument = Document<TextTypeAnswer>;
export type TextTypeAnswerGraphqlDocument = GraphqlDocument<TextTypeAnswer>;
export type TextTypeAnswerDocumentCreate = TextTypeAnswer;
export type NumberTypeAnswer = {
    correctAnswer: number;
};
export type NumberTypeAnswerDocument = Document<NumberTypeAnswer>;
export type NumberTypeAnswerGraphqlDocument = GraphqlDocument<NumberTypeAnswer>;
export type NumberTypeAnswerDocumentCreate = NumberTypeAnswer;
export type RadioTypeAnswer = {
    correctAnswer: string;
    pickingAnswers: string[];
};
export type RadioTypeAnswerDocument = Document<RadioTypeAnswer>;
export type RadioTypeAnswerGraphqlDocument = GraphqlDocument<RadioTypeAnswer>;
export type RadioTypeAnswerDocumentCreate = RadioTypeAnswer;
export type Answer = (TextTypeAnswerGraphqlDocument | NumberTypeAnswerGraphqlDocument | RadioTypeAnswerGraphqlDocument) & {
    pickingAnswers?: RadioTypeAnswerGraphqlDocument['pickingAnswers'] | undefined | null;
};
export type UsersAnswer = {
    userId: string;
    monumentId: string;
    answeredCorrectly: boolean;
};
export type UsersAnswerDocument = Document<UsersAnswer>;
export type UsersAnswerGraphqlDocument = GraphqlDocument<UsersAnswer>;
export type UsersAnswerDocumentCreate = UsersAnswer;
//# sourceMappingURL=Answer.d.ts.map