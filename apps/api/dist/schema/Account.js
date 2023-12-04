"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const UsersPreferences_1 = __importDefault(require("./UsersPreferences"));
exports.default = (0, nexus_1.objectType)({
    name: 'Account',
    definition: (t) => {
        t.string('_createdAt');
        t.string('_updatedAt');
        t.string('_collectionId');
        t.string('_documentId');
        t.list.string('_permissions');
        t.string('_databaseId');
        t.string('userId');
        t.string('myId');
        t.string('username');
        t.boolean('status');
        t.boolean('emailVerification');
        t.boolean('phoneVerification');
        t.field('profilePictureURL', {
            type: 'URL',
            description: 'This is URL of profile picture. Not its id.',
        });
        t.field('prefs', {
            type: UsersPreferences_1.default,
        });
    },
});
