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
const cloudinary_server_1 = __importDefault(require("@app/cloudinary-server"));
const utils_1 = require("@app/utils");
const node_appwrite_1 = require("node-appwrite");
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, nexus_1.queryField)('updateProfilePicture', {
    args: { picture: (0, nexus_1.stringArg)() },
    type: 'Account',
    resolve: (s, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!ctx.isAuthed((_a = ctx.user) === null || _a === void 0 ? void 0 : _a.$id))
            throw new Error('user is not authed');
        if (!(0, utils_1.isBase64)(args.picture))
            throw new TypeError('picture is not a base64 string');
        const { collections } = ctx.appwrite;
        const userInfo = yield collections.userInfo.getDocument([
            node_appwrite_1.Query.equal('userId', ctx.user.$id),
        ]);
        if (!userInfo)
            throw new apollo_server_express_1.ApolloError('userInfo is not defined for updateProfilePicture', '500');
        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.profilePictureURL) {
            // * delete his old picture
            const file = cloudinary_server_1.default.profilePictures.getFileNameFromUrl(userInfo.profilePictureURL);
            yield cloudinary_server_1.default.profilePictures.deleteFiles(file);
        }
        const file = yield cloudinary_server_1.default.profilePictures.uploadBase64(args.picture);
        yield collections.userInfo.updateDocument(userInfo._id, {
            profilePictureURL: file.url,
        });
        return {
            _createdAt: userInfo._createdAt,
            _updatedAt: userInfo._updatedAt,
            _collectionId: userInfo._collectionId,
            _documentId: userInfo._id,
            _permissions: userInfo._permissions,
            _databaseId: userInfo._databaseId,
            emailVerification: ctx.user.emailVerification,
            myId: userInfo.myId,
            prefs: ctx.user.prefs,
            status: ctx.user.status,
            username: userInfo.username,
            phoneVerification: ctx.user.phoneVerification,
            userId: userInfo.userId,
            profilePictureURL: file.url,
        };
    }),
});
