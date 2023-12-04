"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRangeMeters = void 0;
const nexus_1 = require("nexus");
exports.defaultRangeMeters = 700;
exports.default = (0, nexus_1.inputObjectType)({
    name: 'LocationInput',
    definition: (t) => {
        t.field({ name: 'location', type: 'Location' });
        t.nullable.float('rangeMeters', { default: exports.defaultRangeMeters }); //7000 meters
    },
});
