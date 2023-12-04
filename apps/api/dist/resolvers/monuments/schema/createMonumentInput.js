"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.inputObjectType)({
    name: 'CreateMonumentInput',
    definition: (t) => {
        t.string('picture');
        t.string('name');
        t.field('location', { type: 'Location' });
        t.string('about');
        t.string('placeName');
        t.list.field({ type: 'Topic', name: 'topics' });
        t.list.field({ type: 'Transport', name: 'transports' });
        t.nullable.field({ type: 'QuestionInput', name: 'question' });
    },
});
