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
const appwrite_ssr_graphql_1 = require("@app/appwrite-ssr-graphql");
const nexus_1 = require("nexus");
const appwrite_1 = __importDefault(require("../../../../lib/appwrite/appwrite"));
exports.default = (0, nexus_1.mutationField)('likeMonument', {
    args: { monumentId: (0, nexus_1.stringArg)() },
    type: 'MonumentLike',
    resolve: (s_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const { collections } = appwrite_1.default.setAdmin();
        if (!ctx.isAuthed((_a = ctx.user) === null || _a === void 0 ? void 0 : _a.$id))
            throw new Error('User is not authenticated');
        const monument = yield collections.monument.getDocument(args.monumentId);
        if (!monument)
            throw new Error('There is no monument below this id');
        const monumentLike = yield collections.monumentLike.createDocument({ monumentId: args.monumentId, userId: (_b = ctx.user) === null || _b === void 0 ? void 0 : _b.$id }, appwrite_ssr_graphql_1.permissions.owner((_c = ctx.user) === null || _c === void 0 ? void 0 : _c.$id, monument.userId));
        return monumentLike;
    }),
});
