"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const experiences_monuments_1 = require("../lib/database/experiences-monuments");
const appwrite_1 = require("../lib/appwrite/appwrite");
exports.default = (0, nexus_1.objectType)({
    name: 'User',
    definition: (t) => {
        t.string('_createdAt');
        t.string('_updatedAt');
        t.string('_collectionId');
        t.string('_id');
        t.list.string('_permissions');
        t.string('_databaseId');
        t.string('userId');
        t.string('myId');
        t.string('username');
        t.field('profilePictureURL', {
            type: 'URL',
            description: 'This is URL of profile picture. Not its id.',
        });
        t.field('experiences', {
            type: (0, nexus_1.list)('Experience'),
            resolve: (source, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
                const { collections } = ctx.appwrite;
                const queries = [appwrite_1.Queries.experience.equal('userId', source.userId)];
                return (0, experiences_monuments_1.fromLatDocumentLongIntoLocationDocument)(...(yield collections.experience.listDocuments(queries)).documents);
            }),
        }),
            t.field('monuments', {
                type: (0, nexus_1.list)('Monument'),
                resolve: (source, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
                    const { collections } = ctx.appwrite;
                    const queries = [appwrite_1.Queries.monument.equal('userId', source.userId)];
                    return (0, experiences_monuments_1.fromLatDocumentLongIntoLocationDocument)(...(yield collections.monument.listDocuments(queries)).documents);
                }),
            });
    },
});
