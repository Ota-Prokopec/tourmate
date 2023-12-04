"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.inputObjectType)({
    name: 'MonumentInputByName',
    definition: (t) => {
        t.string('name');
        t.int('limit');
    },
});
