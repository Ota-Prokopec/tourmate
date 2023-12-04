"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.inputObjectType)({
    name: 'QuestionInput',
    definition: (t) => {
        t.string('question');
        t.field({ name: 'correctAnswer', type: 'StringOrNumber' });
        t.nullable.list.string('pickingAnswers');
        t.field({ type: 'AnswerType', name: 'type' });
    },
});
