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
const getUser_1 = require("../lib/users/getUser");
exports.default = (0, nexus_1.objectType)({
    name: 'ExperienceLike',
    definition: (t) => {
        t.string('_createdAt');
        t.string('_updatedAt');
        t.string('_collectionId');
        t.string('_id');
        t.list.string('_permissions');
        t.string('_databaseId');
        t.string('userId');
        t.string('experienceId'),
            t.field('user', {
                type: 'User',
                resolve: (source, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
                    const { collections } = ctx.appwrite;
                    return yield (0, getUser_1.getUser)(source.userId, collections);
                }),
            });
    },
});
