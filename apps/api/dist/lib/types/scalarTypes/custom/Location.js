"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@app/utils");
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.scalarType)({
    name: 'Location',
    asNexusMethod: 'location',
    sourceType: '[number, number]',
    deprecation: '[number, number]',
    serialize: (outputValue) => {
        if (!(0, utils_1.isLocation)(outputValue))
            throw new TypeError('input has to be type Location');
        return outputValue;
    },
    parseValue: (inputValue) => {
        if (!(0, utils_1.isLocation)(inputValue))
            throw new TypeError('input has to be type Location');
        return inputValue;
    },
    parseLiteral: (valueNode) => {
        if (!(0, utils_1.isLocation)(valueNode))
            throw new TypeError('input has to be type Location');
        return valueNode;
    },
});
