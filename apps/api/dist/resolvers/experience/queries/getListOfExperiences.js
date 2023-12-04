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
const arguments_1 = require("../../../arguments");
exports.default = (0, nexus_1.queryField)('getListOfExperiences', {
    type: (0, nexus_1.list)('Experience'),
    args: {
        location: (0, nexus_1.nullable)('LocationInput'),
    },
    resolve: (s_, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { collections } = ctx.appwrite;
        const { location: locationOptions } = args;
        const queries = [];
        if (locationOptions)
            queries.push(...(0, experiences_monuments_1.locationQueries)(locationOptions.location, (_a = locationOptions.rangeMeters) !== null && _a !== void 0 ? _a : arguments_1.defaultRangeMeters));
        return (0, experiences_monuments_1.fromLatDocumentLongIntoLocationDocument)(...(yield collections.experience.listDocuments(queries)).documents);
    }),
});
