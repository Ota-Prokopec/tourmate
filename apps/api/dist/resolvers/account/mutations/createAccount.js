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
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, nexus_1.queryField)('createAccount', {
    args: { myId: (0, nexus_1.stringArg)(), username: (0, nexus_1.stringArg)() },
    type: 'Account',
    resolve: (s_, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.isAuthed(ctx.user))
            throw new apollo_server_express_1.ApolloError('user is not authorizated to create account', '403');
        const { collections, account } = ctx.appwrite;
        //! Preferences
        //@ts-ignore
        const updatePrefs = yield account.updatePrefs({
            mapRange: 6000,
            termsAccepted: true,
        });
        const userInfoPromise = collections.userInfo.createDocument({
            myId: args.myId,
            username: args.username,
            userId: ctx.user.$id,
            profilePictureURL: undefined,
        });
        const [userInfo] = yield Promise.all([userInfoPromise]);
        return {
            _createdAt: userInfo._createdAt,
            _updatedAt: userInfo._updatedAt,
            _collectionId: userInfo._collectionId,
            _documentId: userInfo._id,
            _permissions: userInfo._permissions,
            _databaseId: userInfo._databaseId,
            emailVerification: ctx.user.emailVerification,
            myId: userInfo.myId,
            prefs: updatePrefs.prefs,
            status: ctx.user.status,
            username: userInfo.username,
            phoneVerification: ctx.user.phoneVerification,
            userId: ctx.user.$id,
            profilePictureURL: userInfo.profilePictureURL,
        };
    }),
});
