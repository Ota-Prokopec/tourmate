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
const apollo_server_express_1 = require("apollo-server-express");
const nexus_1 = require("nexus");
// ! dont check if user has created Account in userInfo because user logs in with this query in register for creating an acccount
//	args: { email: stringArg(), password: stringArg(), posts: arg({ type: 'PostInput' }) },
exports.default = (0, nexus_1.queryField)('logInViaEmail', {
    type: 'EmailLogin',
    args: { email: (0, nexus_1.stringArg)(), password: (0, nexus_1.stringArg)() },
    resolve: (source, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { account } = ctx.appwrite;
            const { sessionToken: cookie } = yield account.loginViaEmail(args.email, args.password);
            ctx.res.cookie(`a_session_${process.env.APPWRITE_PROJECT_ID}`, cookie.value, {
                sameSite: 'strict',
                domain: '.localhost',
                secure: false,
                maxAge: 999999999999999,
                httpOnly: false,
            });
            return { session: cookie.value };
        }
        catch (error) {
            if (error instanceof Error)
                throw new apollo_server_express_1.ApolloError('Signing in was not successful', error.message);
            else
                throw error;
        }
    }),
});
