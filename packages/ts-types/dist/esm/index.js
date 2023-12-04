import { z } from 'zod';

const answerTypeZod = z.union([
    z.literal('radio'),
    z.literal('text'),
    z.literal('number'),
]);
const isQuestionTypeRadio = (input) => {
    try {
        questionTypeRadioZod.parse(input);
        return true;
    }
    catch (error) {
        return false;
    }
};
const isQuestionTypeNumber = (input) => {
    try {
        questionTypeNumberZod.parse(input);
        return true;
    }
    catch (error) {
        return false;
    }
};
const isQuestionTypeText = (input) => {
    try {
        questionTypeTextZod.parse(input);
        return true;
    }
    catch (error) {
        return false;
    }
};
const getQuestionType = (question) => {
    if (isQuestionTypeText(question))
        return ['text', question];
    if (isQuestionTypeNumber(question))
        return ['number', question];
    if (isQuestionTypeRadio(question))
        return ['radio', question];
    else
        throw new Error('Unknown type');
};
const isQuestion = (value) => {
    try {
        getQuestionType(value);
        return true;
    }
    catch (error) {
        return false;
    }
};
const questionTypeRadioZod = z.object({
    question: z.string().nonempty(),
    type: z.literal('radio'),
    correctAnswer: z.string().nonempty(),
    pickingAnswers: z.string().array(),
});
const questionTypeNumberZod = z.object({
    question: z.string().nonempty(),
    type: z.literal('number'),
    correctAnswer: z.number(),
});
const questionTypeTextZod = z.object({
    question: z.string().nonempty(),
    type: z.literal('text'),
    correctAnswer: z.string().nonempty(),
});

const topicZod = z.union([
    z.literal('castle'),
    z.literal('monument'),
    z.literal('person'),
    z.literal('animals'),
    z.literal('hiking'),
]);

const transportZod = z.union([
    z.literal('train'),
    z.literal('bus'),
    z.literal('car'),
    z.literal('walk'),
    z.literal('bike'),
]);

export { answerTypeZod, getQuestionType, isQuestion, isQuestionTypeNumber, isQuestionTypeRadio, isQuestionTypeText, topicZod, transportZod };
//# sourceMappingURL=index.js.map
