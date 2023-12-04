"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@app/utils");
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.scalarType)({
    name: 'Topic',
    asNexusMethod: 'topic',
    sourceType: '"castle" | "monument" | "person" | "animals" | "hiking"',
    deprecation: '"castle" | "monument" | "person" | "animals" | "hiking"',
    serialize: (outputValue) => {
        if (!(0, utils_1.isTopic)(outputValue))
            throw new TypeError('input has to be type Topic');
        return outputValue;
    },
    parseValue: (inputValue) => {
        if (!(0, utils_1.isTopic)(inputValue))
            throw new TypeError('input has to be type Topic');
        return inputValue;
    },
    parseLiteral: (valueNode) => {
        console.log(valueNode);
        if (!(0, utils_1.isTopic)(valueNode))
            throw new TypeError('input has to be type Topic');
        return valueNode;
    },
});
