"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.objectType)({
    name: 'PlaceDetail',
    definition: (t) => {
        t.string('_createdAt');
        t.string('_updatedAt');
        t.string('_collectionId');
        t.string('_id');
        t.list.string('_permissions');
        t.string('_databaseId');
        t.string('name');
    },
});
