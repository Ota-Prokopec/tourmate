"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.scalarType)({
    name: 'StringOrNumber',
    asNexusMethod: 'stringOrNumber',
    sourceType: 'string | number',
    deprecation: 'string | number',
    serialize: (outputValue) => {
        if (typeof outputValue !== 'string' && typeof outputValue !== 'number')
            throw new TypeError('input has to be type string|number');
        return outputValue;
    },
    parseValue: (inputValue) => {
        if (typeof inputValue !== 'string' && typeof inputValue !== 'number')
            throw new TypeError('input has to be type string|number');
        return inputValue;
    },
    parseLiteral: (valueNode) => {
        if (typeof valueNode !== 'string' && typeof valueNode !== 'number')
            throw new TypeError('input has to be type string|number');
        return valueNode;
    },
});
