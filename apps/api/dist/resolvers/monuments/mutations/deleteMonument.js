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
const appwrite_1 = require("../../../lib/appwrite/appwrite");
const cloudinary_server_1 = __importDefault(require("@app/cloudinary-server"));
//TODO: delete the users answers on question
//FIXME: when i delete a monument where experiences are, experiences will become free-experiences
exports.default = (0, nexus_1.mutationField)('deleteMonument', {
    type: 'Boolean',
    args: { monumentId: (0, nexus_1.stringArg)() },
    resolve: (s_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { collections } = ctx.appwrite;
        const monument = yield collections.monument.getDocument([
            appwrite_1.Queries.monument.equal('$id', args.monumentId),
        ]);
        const question = (monument === null || monument === void 0 ? void 0 : monument.questionId)
            ? yield collections.question.getDocument(monument.questionId)
            : null;
        if (!monument)
            throw new Error('This monument does not exist');
        // delete monument-like
        const monumentLikesDeleteQueries = appwrite_1.Queries.monumentLike.equal('monumentId', args.monumentId);
        const deleteLikesPromise = collections.monumentLike.deleteDocuments([
            monumentLikesDeleteQueries,
        ]);
        //delete users-answers that users answered to this monument
        const deleteUsersAnswersPromise = collections.usersAnswer.deleteAllDocuments([
            appwrite_1.Queries.usersAnswer.equal('monumentId', monument._id),
        ]);
        //question
        const deleteQuestionAnswerPromise = question
            ? question.answerType === 'text'
                ? collections.answerTypeText.deleteDocument(question.answerId)
                : question.answerType === 'number'
                    ? collections.answerTypeNumber.deleteDocument(question.answerId)
                    : collections.answerTypeRadio.deleteDocument(question.answerId)
            : null;
        const deleteQuestionPromise = question
            ? collections.question.deleteDocument(question === null || question === void 0 ? void 0 : question._id)
            : null;
        // delete monument picture from cloudinary
        let pictureDeletePromise;
        if (monument === null || monument === void 0 ? void 0 : monument.pictureURL) {
            const pictureFile = cloudinary_server_1.default.monuments.getFileNameFromUrl(monument.pictureURL);
            pictureDeletePromise = cloudinary_server_1.default.monuments.deleteFiles(pictureFile);
        }
        // delete place-detail of monument
        const placeDetailDeletePromise = collections.placeDetail.deleteDocument(monument.placeDetailId);
        // delete monument it self
        const monumentDeletePromise = collections.monument.deleteDocument(monument === null || monument === void 0 ? void 0 : monument._id);
        // all into promise
        yield Promise.all([
            deleteLikesPromise,
            pictureDeletePromise,
            monumentDeletePromise,
            placeDetailDeletePromise,
            deleteQuestionAnswerPromise,
            deleteQuestionPromise,
            deleteUsersAnswersPromise,
        ]);
        return true;
    }),
});
