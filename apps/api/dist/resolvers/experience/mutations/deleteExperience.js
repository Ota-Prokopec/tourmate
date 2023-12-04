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
exports.default = (0, nexus_1.mutationField)('deleteExperience', {
    type: 'Boolean',
    args: { experienceId: (0, nexus_1.stringArg)() },
    resolve: (s_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { collections } = ctx.appwrite;
        const experience = yield collections.experience.getDocument([
            appwrite_1.Queries.experience.equal('$id', args.experienceId),
        ]);
        if (!experience)
            throw new Error('This experience does not exist');
        // delete experience-likes
        const experienceLikesDeleteQueries = appwrite_1.Queries.experienceLike.equal('experienceId', args.experienceId);
        const deleteLikesPromise = collections.experienceLike.deleteDocuments([
            experienceLikesDeleteQueries,
        ]);
        // delete monument picture from cloudinary
        let pictureDeletePromise;
        const pictureFile = cloudinary_server_1.default.experiences.getFileNameFromUrl(experience.pictureUrl);
        pictureDeletePromise = cloudinary_server_1.default.experiences.deleteFiles(pictureFile);
        // delete experience it self
        const experienceDeletePromise = collections.experience.deleteDocument(experience._id);
        // all into promise
        yield Promise.all([deleteLikesPromise, pictureDeletePromise, experienceDeletePromise]);
        return true;
    }),
});
