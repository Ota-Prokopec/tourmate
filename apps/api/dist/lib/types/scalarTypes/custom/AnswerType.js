"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_types_1 = require("@app/ts-types");
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.scalarType)({
    name: 'AnswerType',
    asNexusMethod: 'answerType',
    sourceType: "'radio' | 'text' | 'number'",
    deprecation: "'radio' | 'text' | 'number'",
    serialize: (outputValue) => {
        ts_types_1.answerTypeZod.parse(outputValue);
        return outputValue;
    },
    parseValue: (inputValue) => {
        ts_types_1.answerTypeZod.parse(inputValue);
        return inputValue;
    },
    parseLiteral: (valueNode) => {
        ts_types_1.answerTypeZod.parse(valueNode);
        return valueNode;
    },
});
