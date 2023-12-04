import { Document, GraphqlDocument } from './Document';
import { z } from 'zod';
export declare const answerTypeZod: z.ZodUnion<[z.ZodLiteral<"radio">, z.ZodLiteral<"text">, z.ZodLiteral<"number">]>;
export type AnswerType = z.infer<typeof answerTypeZod>;
export declare const isQuestionTypeRadio: (input: unknown) => input is Question<"radio">;
export declare const isQuestionTypeNumber: (input: unknown) => input is Skeleton<"number">;
export declare const isQuestionTypeText: (input: unknown) => input is Skeleton<"text">;
export declare const getQuestionType: (question: unknown) => readonly ["text", Skeleton<"text">] | readonly ["number", Skeleton<"number">] | readonly ["radio", Question<"radio">];
export declare const isQuestion: (value: unknown) => boolean;
type Skeleton<T extends AnswerType> = {
    question: string;
    type: T;
    correctAnswer: T extends 'number' ? number : string;
    pickingAnswers?: string[] | undefined | null;
};
export type Question<T extends AnswerType> = Skeleton<T> & (T extends 'radio' ? {
    pickingAnswers: string[];
} : Skeleton<T>);
export type QuestionDocumentCreate = {
    question: string;
    answerType: AnswerType;
    answerId: string;
};
export type QuestionDocument = Document<QuestionDocumentCreate>;
export type QuestionGraphqlDocument = GraphqlDocument<QuestionDocumentCreate>;
export {};
//# sourceMappingURL=Question.d.ts.map