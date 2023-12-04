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
const appwrite_ssr_graphql_1 = require("@app/appwrite-ssr-graphql");
const utils_1 = require("@app/utils");
const apollo_server_express_1 = require("apollo-server-express");
const lodash_1 = require("lodash");
const nexus_1 = require("nexus");
const LocationInput_1 = require("../arguments/LocationInput");
const appwrite_1 = require("../lib/appwrite/appwrite");
const experiences_monuments_1 = require("../lib/database/experiences-monuments");
const getUser_1 = require("../lib/users/getUser");
exports.default = (0, nexus_1.objectType)({
    name: 'Monument',
    definition: (t) => {
        t.string('_createdAt');
        t.string('_updatedAt');
        t.string('_collectionId');
        t.string('_id');
        t.list.string('_permissions');
        t.string('_databaseId');
        t.field('location', { type: 'Location' });
        t.string('userId');
        t.string('name');
        t.nullable.string('questionId');
        t.nullable.string('about');
        t.list.field('topics', { type: 'Topic' });
        t.string('placeDetailId');
        t.list.field('transports', { type: 'Transport' });
        t.field('pictureURL', {
            type: 'URL',
            description: 'This it an URL not id of picture',
        });
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
        }),
            t.field('nearExperiences', {
                type: (0, nexus_1.list)('Experience'),
                resolve: (source, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
                    var _a, _b;
                    const { collections } = ctx.appwrite;
                    if (!(0, utils_1.isLocation)(source.location))
                        throw new Error('location is not valid');
                    const queries = [
                        ...(0, experiences_monuments_1.locationQueries)(source.location, (_b = (_a = ctx.user) === null || _a === void 0 ? void 0 : _a.prefs.mapRange) !== null && _b !== void 0 ? _b : LocationInput_1.defaultRangeMeters),
                    ];
                    return (0, experiences_monuments_1.fromLatDocumentLongIntoLocationDocument)(...(yield collections.experience.listDocuments(queries)).documents);
                }),
            });
        t.field('placeDetail', {
            type: 'PlaceDetail',
            resolve: (source, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
                const { collections } = ctx.appwrite;
                const placeDetail = yield collections.placeDetail.getDocument(source.placeDetailId);
                if (!placeDetail)
                    throw new Error('placeDetail was not found');
                return placeDetail;
            }),
        });
        t.field('likes', {
            type: (0, nexus_1.list)('MonumentLike'),
            resolve: (source, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
                var _c;
                if (!ctx.isAuthed((_c = ctx.user) === null || _c === void 0 ? void 0 : _c.$id))
                    throw new Error('user is not authed');
                const { collections, Queries } = ctx.appwrite;
                const queries = [
                    Queries.monumentLike.equal('monumentId', source._id), // get by monument id
                    Queries.monumentLike.limit(6), // only 6 of them
                    Queries.monumentLike.notEqual('userId', ctx.user.$id), // dont pick me
                ];
                const likes = yield collections.monumentLike.listDocuments(queries);
                return likes.documents;
            }),
        });
        t.field('liked', {
            type: (0, nexus_1.nullable)('MonumentLike'),
            resolve: (source, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
                var _d;
                if (!ctx.isAuthed((_d = ctx.user) === null || _d === void 0 ? void 0 : _d.$id))
                    throw new Error('user is not authed');
                const { collections, Queries } = ctx.appwrite;
                const queries = [
                    Queries.monumentLike.equal('monumentId', source._id),
                    Queries.monumentLike.equal('userId', ctx.user.$id),
                ];
                const likeDoc = yield collections.monumentLike.getDocument(queries);
                return likeDoc;
            }),
        });
        t.field('connectedExperiences', {
            type: (0, nexus_1.list)('Experience'),
            resolve: (source, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
                var _e;
                if (!ctx.isAuthed((_e = ctx.user) === null || _e === void 0 ? void 0 : _e.$id))
                    throw new Error('user is not authed');
                const { collections, Queries } = ctx.appwrite;
                const queries = [Queries.experience.equal('connectedMonumentId', source._id)];
                const expDocs = (yield collections.experience.listDocuments(queries)).documents;
                return (0, experiences_monuments_1.fromLatDocumentLongIntoLocationDocument)(...expDocs);
            }),
        });
        t.field('question', {
            type: (0, nexus_1.nullable)('Question'),
            resolve: (source, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
                if (!source.questionId)
                    return null;
                const { collections } = ctx.appwrite;
                const questionDocument = yield collections.question.getDocument(source.questionId);
                if (!questionDocument)
                    throw new Error('There is no question bellow this id');
                let answer;
                if (questionDocument.answerType === 'text') {
                    answer = yield collections.answerTypeText.getDocument(questionDocument.answerId);
                }
                else if (questionDocument.answerType === 'number') {
                    answer = yield collections.answerTypeNumber.getDocument(questionDocument.answerId);
                }
                else {
                    answer = yield collections.answerTypeRadio.getDocument(questionDocument.answerId);
                }
                if (!answer)
                    throw new Error('Answer bellow the id was not found');
                return Object.assign(Object.assign({}, (0, lodash_1.pick)(questionDocument, ...appwrite_ssr_graphql_1.appwriteGraphqlKeys)), { type: questionDocument.answerType, correctAnswer: answer.correctAnswer, question: questionDocument.question, pickingAnswers: answer.pickingAnswers });
            }),
        });
        t.field('usersAnswerToQuestion', {
            type: (0, nexus_1.nullable)('UsersAnswerToQuestion'),
            resolve: (source, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
                if (!ctx.isAuthed(ctx.user))
                    throw new apollo_server_express_1.ApolloError('User is not authed', '401');
                const { collections } = ctx.appwrite;
                const answerDocument = yield collections.usersAnswer.getDocument([
                    appwrite_1.Queries.usersAnswer.equal('userId', ctx.user.$id),
                ]);
                if (!answerDocument)
                    return null;
                return { answeredCorrectly: answerDocument.answeredCorrectly };
            }),
        });
    },
});
