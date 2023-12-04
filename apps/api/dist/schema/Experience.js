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
const getUser_1 = require("../lib/users/getUser");
const apollo_server_express_1 = require("apollo-server-express");
const nexus_1 = require("nexus");
const appwrite_1 = require("../lib/appwrite/appwrite");
const experiences_monuments_1 = require("../lib/database/experiences-monuments");
exports.default = (0, nexus_1.objectType)({
    name: 'Experience',
    definition: (t) => {
        t.string('_createdAt');
        t.string('_updatedAt');
        t.string('_collectionId');
        t.string('_id');
        t.list.string('_permissions');
        t.string('_databaseId');
        t.string('userId');
        t.field('pictureUrl', { type: 'URL' });
        t.field('location', { type: 'Location' });
        t.string('connectedMonumentId');
        t.field('user', {
            type: 'User',
            resolve: (source, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
                let userId = source.userId;
                if (!ctx.isAuthed(ctx.user))
                    throw new apollo_server_express_1.ApolloError('user is not authorizated to create account', '403');
                if (!userId)
                    userId = ctx.user.$id; //if no input it will be the user that is logged in
                if (!userId)
                    throw new apollo_server_express_1.ApolloError('user is not authorizated to create account', '403');
                const { collections } = ctx.appwrite;
                return yield (0, getUser_1.getUser)(userId, collections);
            }),
        });
        t.field('likes', {
            type: (0, nexus_1.list)('ExperienceLike'),
            resolve: (source, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                if (!ctx.isAuthed((_a = ctx.user) === null || _a === void 0 ? void 0 : _a.$id))
                    throw new Error('user is not authed');
                const { collections, Queries } = ctx.appwrite;
                const queries = [
                    Queries.experienceLike.equal('experienceId', source._id), // get by monument id
                    Queries.experienceLike.limit(6), // only 6 of them
                    Queries.experienceLike.notEqual('userId', ctx.user.$id), // not pick me
                    //! userid is not working
                ];
                const likes = yield collections.experienceLike.listDocuments(queries);
                return likes.documents;
            }),
        });
        t.field('liked', {
            type: (0, nexus_1.nullable)('ExperienceLike'),
            resolve: (source, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
                var _b;
                if (!ctx.isAuthed((_b = ctx.user) === null || _b === void 0 ? void 0 : _b.$id))
                    throw new Error('user is not authed');
                const { collections, Queries } = ctx.appwrite;
                const queries = [
                    Queries.experienceLike.equal('experienceId', source._id),
                    Queries.experienceLike.equal('userId', ctx.user.$id),
                ];
                const likeDoc = yield collections.experienceLike.getDocument(queries);
                return likeDoc;
            }),
        });
        t.field('connectedMonument', {
            type: (0, nexus_1.nullable)('Monument'),
            resolve: (source, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
                const { collections } = ctx.appwrite;
                const monument = yield collections.monument.getDocument([
                    appwrite_1.Queries.monument.equal('$id', source.connectedMonumentId),
                ]);
                if (!monument)
                    return null;
                const res = (0, experiences_monuments_1.fromLatDocumentLongIntoLocationDocument)(monument)[0];
                if (!res)
                    return null;
                return res;
            }),
        });
    },
});
