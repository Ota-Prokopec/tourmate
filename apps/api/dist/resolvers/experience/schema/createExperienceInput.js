"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.inputObjectType)({
    name: 'CreateExperienceInput',
    definition: (t) => {
        t.string('picture');
        t.field('location', { type: 'Location' });
        t.string('connnectedMonumentId');
    },
});
