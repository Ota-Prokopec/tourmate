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
exports.default = (0, nexus_1.queryField)('logout', {
    type: 'Boolean',
    resolve: (source, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        const { account } = ctx.appwrite;
        const { sessionToken: cookie } = yield account.logOut();
        ctx.res.clearCookie(cookie.name);
        return true;
    }),
});
