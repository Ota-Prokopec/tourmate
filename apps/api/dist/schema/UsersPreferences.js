"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.objectType)({
    name: 'UsersPreferences',
    definition: (t) => {
        t.int('mapRange');
        t.boolean('termsAccepted');
    },
});
