"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@app/utils");
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.scalarType)({
    name: 'Transport',
    asNexusMethod: 'transport',
    sourceType: '"train" | "bus" | "car" | "walk" | "bike"',
    deprecation: '"train" | "bus" | "car" | "walk" | "bike"',
    serialize: (outputValue) => {
        if (!(0, utils_1.isTransport)(outputValue))
            throw new TypeError('input has to be type Transport');
        return outputValue;
    },
    parseValue: (inputValue) => {
        if (!(0, utils_1.isTransport)(inputValue))
            throw new TypeError('input has to be type Transport');
        return inputValue;
    },
    parseLiteral: (valueNode) => {
        if (!(0, utils_1.isTransport)(valueNode))
            throw new TypeError('input has to be type Transport');
        return valueNode;
    },
});
