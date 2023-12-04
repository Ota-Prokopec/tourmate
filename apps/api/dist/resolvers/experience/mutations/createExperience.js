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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const utils_1 = require("@app/utils");
const apollo_server_express_1 = require("apollo-server-express");
const experiences_monuments_1 = require("../../../lib/database/experiences-monuments");
const cloudinary_server_1 = __importDefault(require("@app/cloudinary-server"));
const appwrite_1 = require("../../../lib/appwrite/appwrite");
exports.default = (0, nexus_1.mutationField)('createExperience', {
    args: { input: (0, nexus_1.arg)({ type: 'CreateExperienceInput' }) },
    type: 'Experience',
    resolve: (s, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { collections } = ctx.appwrite;
        if (!(0, utils_1.isBase64)(args.input.picture))
            throw new Error('input.imgSrc musts be a valid base64 string');
        if (!ctx.isAuthed((_a = ctx.user) === null || _a === void 0 ? void 0 : _a.$id))
            throw new Error('user is not authed');
        const monument = yield collections.monument.getDocument(args.input.connnectedMonumentId);
        if (!monument)
            throw new apollo_server_express_1.ApolloError('No monument was found', '404');
        //checking: question and answer
        if (monument.questionId) {
            const usersAnswer = yield collections.usersAnswer.getDocument([
                appwrite_1.Queries.usersAnswer.equal('userId', ctx.user.$id),
                appwrite_1.Queries.usersAnswer.equal('monumentId', monument._id),
            ]);
            if (!usersAnswer)
                throw new apollo_server_express_1.ApolloError('User did not answer the question so he cant save a picture bellow this monument');
            if (!usersAnswer.answeredCorrectly)
                throw new apollo_server_express_1.ApolloError('User answered wrong the question so he cant save a picture bellow this monument');
        }
        const document = yield cloudinary_server_1.default.experiences
            .uploadBase64(args.input.picture)
            .then(({ url }) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            if (!ctx.isAuthed((_b = ctx.user) === null || _b === void 0 ? void 0 : _b.$id))
                throw new apollo_server_express_1.ApolloError('User is not Authed', '403');
            return yield collections.experience.createDocument({
                connectedMonumentId: args.input.connnectedMonumentId,
                userId: ctx.user.$id,
                pictureUrl: url,
                latitude: Math.round(args.input.location[0]),
                longitude: Math.round(args.input.location[1]),
            });
        }));
        const res = (0, experiences_monuments_1.fromLatDocumentLongIntoLocationDocument)(document)[0];
        if (!res)
            throw new apollo_server_express_1.ApolloError('creating experience was no successful');
        return res;
    }),
});
