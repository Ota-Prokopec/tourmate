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
exports.getUser = void 0;
const appwrite_1 = require("../appwrite/appwrite");
const getUser = (userId, collections) => __awaiter(void 0, void 0, void 0, function* () {
    const query = appwrite_1.Queries.userInfo.equal('userId', userId);
    const userInfo = yield collections.userInfo.getDocument([query]);
    if (!userInfo)
        throw new Error('userInfo not found');
    return {
        _createdAt: userInfo._createdAt,
        _updatedAt: userInfo._updatedAt,
        _collectionId: userInfo._collectionId,
        _id: userInfo._id,
        _permissions: userInfo._permissions,
        _databaseId: userInfo._databaseId,
        myId: userInfo.myId,
        username: userInfo.username,
        userId: userInfo.userId,
        profilePictureURL: userInfo.profilePictureURL,
    };
});
exports.getUser = getUser;
