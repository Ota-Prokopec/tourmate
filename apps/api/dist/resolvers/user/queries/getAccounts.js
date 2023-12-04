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
const appwrite_1 = require("../../../lib/appwrite/appwrite");
exports.default = (0, nexus_1.queryField)('getUsers', {
    type: (0, nexus_1.list)('User'),
    args: { searchingText: (0, nexus_1.nullable)((0, nexus_1.stringArg)()) },
    resolve: (s, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.isAuthed(ctx.user))
            throw new apollo_server_express_1.ApolloError('user is not authorizated to create account', '403');
        const { collections } = ctx.appwrite;
        const queries = [];
        if (args.searchingText)
            queries.push(appwrite_1.Queries.userInfo.startsWith('username', args.searchingText));
        const { documents: users } = yield collections.userInfo.listDocuments(queries);
        return users;
    }),
});
