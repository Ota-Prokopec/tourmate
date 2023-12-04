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
const getUser_1 = require("../../../lib/users/getUser");
const appwrite_1 = require("../../../lib/appwrite/appwrite");
exports.default = (0, nexus_1.queryField)('getUser', {
    args: { userId: (0, nexus_1.nullable)((0, nexus_1.stringArg)()), myId: (0, nexus_1.nullable)((0, nexus_1.stringArg)()) },
    type: 'User',
    resolve: (s_, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.isAuthed(ctx.user))
            throw new apollo_server_express_1.ApolloError('user is not authorizated to get account', '403');
        const { collections } = ctx.appwrite;
        let { userId, myId } = args;
        if (myId && !userId) {
            const userInfo = yield collections.userInfo.getDocument([
                appwrite_1.Queries.userInfo.equal('myId', myId),
            ]);
            if (!userInfo)
                throw new Error('userInfo not found');
            userId = userInfo.userId;
        }
        if (!userId)
            userId = ctx.user.$id; //if no input it will be the user that is logged in
        return yield (0, getUser_1.getUser)(userId, collections);
    }),
});
