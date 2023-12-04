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
const cloudinary_server_1 = __importDefault(require("@app/cloudinary-server"));
const ts_types_1 = require("@app/ts-types");
const nexus_1 = require("nexus");
const experiences_monuments_1 = require("../../../lib/database/experiences-monuments");
const appwrite_ssr_graphql_1 = require("@app/appwrite-ssr-graphql");
const appwrite_1 = __importDefault(require("../../../lib/appwrite/appwrite"));
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, nexus_1.mutationField)('createMonument', {
    type: 'Monument',
    args: { input: (0, nexus_1.arg)({ type: 'CreateMonumentInput' }) },
    resolve: (s, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!ctx.isAuthed((_a = ctx.user) === null || _a === void 0 ? void 0 : _a.$id))
                throw new Error('user is not authed');
            const { collections } = ctx.appwrite;
            // create image for monument
            const filePromise = cloudinary_server_1.default.monuments.uploadBase64(args.input.picture);
            //create place-detail for monument
            const placeDetailPromise = collections.placeDetail.createDocument({
                name: args.input.placeName,
            }, [ctx.user]);
            //add optional question
            const question = yield saveQuestion(args.input.question, appwrite_ssr_graphql_1.permissions.owner(ctx.user.$id));
            // all promises before the monument it selfs will be created
            const [file, placeDetail] = yield Promise.all([filePromise, placeDetailPromise]);
            //create monument
            const document = yield collections.monument.createDocument({
                transports: args.input.transports,
                placeDetailId: placeDetail._id,
                topics: args.input.topics,
                latitude: args.input.location[0],
                longitude: args.input.location[1],
                about: args.input.about,
                name: args.input.name,
                userId: ctx.user.$id,
                pictureURL: file.url,
                questionId: question === null || question === void 0 ? void 0 : question._id,
            }, [ctx.user]);
            const res = (0, experiences_monuments_1.fromLatDocumentLongIntoLocationDocument)(document)[0];
            if (!res)
                throw new apollo_server_express_1.ApolloError('creating monument was not successful');
            return res;
        }
        catch (error) {
            console.log(error);
            throw new Error('');
        }
    }),
});
const saveQuestion = (question, permissions) => __awaiter(void 0, void 0, void 0, function* () {
    if (!question)
        return undefined;
    const { collections } = appwrite_1.default.setAdmin();
    let answer;
    if ((0, ts_types_1.isQuestionTypeText)(question)) {
        answer = yield collections.answerTypeText.createDocument({
            correctAnswer: question.correctAnswer,
        }, permissions);
    }
    else if ((0, ts_types_1.isQuestionTypeNumber)(question)) {
        answer = yield collections.answerTypeNumber.createDocument({
            correctAnswer: question.correctAnswer,
        }, permissions);
    }
    else if ((0, ts_types_1.isQuestionTypeRadio)(question)) {
        answer = yield collections.answerTypeRadio.createDocument({
            correctAnswer: question.correctAnswer,
            pickingAnswers: question.pickingAnswers,
        }, permissions);
    }
    else
        throw new Error('Uknown type of answer');
    const res = yield collections.question.createDocument({
        question: question.question,
        answerType: question.type,
        answerId: answer._id,
    }, permissions);
    return Object.assign({ correctAnswer: answer.correctAnswer, pickingAnswers: answer.pickingAnswers, type: question.type }, res);
});
