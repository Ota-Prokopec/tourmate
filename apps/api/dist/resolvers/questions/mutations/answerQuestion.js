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
const apollo_server_express_1 = require("apollo-server-express");
const nexus_1 = require("nexus");
exports.default = (0, nexus_1.mutationField)('answerQuestion', {
    args: { monumentId: (0, nexus_1.stringArg)(), answer: 'StringOrNumber' },
    type: 'UsersAnswerToQuestion',
    resolve: (s_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { collections } = ctx.appwrite;
        if (!ctx.isAuthed(ctx.user))
            throw new apollo_server_express_1.ApolloError('User is not authed', '401');
        const monument = yield collections.monument.getDocument(args.monumentId);
        if (!monument)
            throw new Error('Monument bellow this id was not found');
        const { questionId } = monument;
        if (!questionId)
            throw new Error('This monument has no question');
        const question = yield collections.question.getDocument(questionId);
        if (!question)
            throw new Error('Question bellow this id was not found');
        let answerDoc;
        if (question.answerType === 'text') {
            answerDoc = yield collections.answerTypeText.getDocument(question.answerId);
        }
        else if (question.answerType === 'number') {
            answerDoc = yield collections.answerTypeNumber.getDocument(question.answerId);
        }
        else
            answerDoc = yield collections.answerTypeRadio.getDocument(question.answerId);
        if (!answerDoc)
            throw new Error('Answer bellow this question was not found');
        const result = answerDoc.correctAnswer.toString().localeCompare(args.answer.toString()) === 0;
        const usersAnswerDocument = yield collections.usersAnswer.createDocument({
            monumentId: monument._id,
            answeredCorrectly: result,
            userId: ctx.user.$id,
        }, appwrite_ssr_graphql_1.permissions.owner(ctx.user.$id, monument.userId));
        return {
            answeredCorrectly: result,
        };
    }),
});
