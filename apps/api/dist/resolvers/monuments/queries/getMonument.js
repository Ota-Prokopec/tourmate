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
const experiences_monuments_1 = require("../../../lib/database/experiences-monuments");
exports.default = (0, nexus_1.queryField)('getMonument', {
    type: 'Monument',
    args: { id: (0, nexus_1.stringArg)() },
    resolve: (s, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        const { collections } = ctx.appwrite;
        const monumentDocument = yield collections.monument.getDocument(args.id);
        if (!monumentDocument)
            throw new Error('Monument not found');
        const res = (0, experiences_monuments_1.fromLatDocumentLongIntoLocationDocument)(monumentDocument)[0];
        if (!res)
            throw new Error('Monument not found');
        return res;
    }),
});
