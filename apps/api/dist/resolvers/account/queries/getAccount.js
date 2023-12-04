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
const lodash_1 = require("lodash");
exports.default = (0, nexus_1.queryField)('getAccount', {
    type: 'Account',
    resolve: (s_, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.isAuthed(ctx.user))
            throw new apollo_server_express_1.ApolloError('user is not authorizated to get account', '403');
        const { collections } = ctx.appwrite;
        const userInfo = yield (0, getUser_1.getUser)(ctx.user.$id, collections);
        return Object.assign(Object.assign(Object.assign({}, (0, lodash_1.omit)(userInfo, '_id')), (0, lodash_1.pick)(ctx.user, 'emailVerification', 'status', 'phoneVerification', 'prefs')), { _documentId: userInfo._id });
    }),
});
