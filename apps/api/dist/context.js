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
exports.context = void 0;
const appwrite_1 = __importDefault(require("./lib/appwrite/appwrite"));
const context = ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = Object.entries(req.cookies).map(([key, value]) => ({
            name: key,
            value: value,
        }));
        let user = null;
        let appwrite;
        try {
            appwrite = appwrite_1.default.setCookie(cookies);
            user = yield appwrite.account.get();
            // appwrite.account.updatePrefs<Preferences>({
            // 	mapRange: 400,
            // 	termsAccepted: true,
            // })
        }
        catch (error) {
            appwrite = appwrite_1.default.setNone();
            //user is equal to null
        }
        return {
            req,
            res,
            isAuthed: (ctxUser) => ctxUser !== null,
            user: user,
            appwrite: appwrite,
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.context = context;
