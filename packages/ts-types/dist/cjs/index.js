'use strict';

var zod = require('zod');

const answerTypeZod = zod.z.union([
    zod.z.literal('radio'),
    zod.z.literal('text'),
    zod.z.literal('number'),
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
const questionTypeRadioZod = zod.z.object({
    question: zod.z.string().nonempty(),
    type: zod.z.literal('radio'),
    correctAnswer: zod.z.string().nonempty(),
    pickingAnswers: zod.z.string().array(),
});
const questionTypeNumberZod = zod.z.object({
    question: zod.z.string().nonempty(),
    type: zod.z.literal('number'),
    correctAnswer: zod.z.number(),
});
const questionTypeTextZod = zod.z.object({
    question: zod.z.string().nonempty(),
    type: zod.z.literal('text'),
    correctAnswer: zod.z.string().nonempty(),
});

const topicZod = zod.z.union([
    zod.z.literal('castle'),
    zod.z.literal('monument'),
    zod.z.literal('person'),
    zod.z.literal('animals'),
    zod.z.literal('hiking'),
]);

const transportZod = zod.z.union([
    zod.z.literal('train'),
    zod.z.literal('bus'),
    zod.z.literal('car'),
    zod.z.literal('walk'),
    zod.z.literal('bike'),
]);

exports.answerTypeZod = answerTypeZod;
exports.getQuestionType = getQuestionType;
exports.isQuestion = isQuestion;
exports.isQuestionTypeNumber = isQuestionTypeNumber;
exports.isQuestionTypeRadio = isQuestionTypeRadio;
exports.isQuestionTypeText = isQuestionTypeText;
exports.topicZod = topicZod;
exports.transportZod = transportZod;
//# sourceMappingURL=index.js.map
