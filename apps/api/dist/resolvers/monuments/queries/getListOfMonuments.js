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
const appwrite_1 = require("../../../lib/appwrite/appwrite");
const arguments_1 = require("../../../arguments");
exports.default = (0, nexus_1.queryField)('getListOfMonuments', {
    type: (0, nexus_1.list)('Monument'),
    args: {
        location: (0, nexus_1.nullable)('LocationInput'),
        topics: (0, nexus_1.nullable)((0, nexus_1.list)('Topic')),
        transports: (0, nexus_1.nullable)((0, nexus_1.list)('Transport')),
        name: (0, nexus_1.nullable)('String'),
        limit: (0, nexus_1.nullable)((0, nexus_1.arg)({ type: 'Int', default: 50 })),
        userId: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
        offset: (0, nexus_1.nullable)((0, nexus_1.intArg)()),
    },
    resolve: (s, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { collections } = ctx.appwrite;
        const { location: locationOptions, topics, transports, name, limit, userId, offset, } = args;
        let queries = [];
        if (locationOptions) {
            queries.push(...(0, experiences_monuments_1.locationQueries)(locationOptions.location, locationOptions.rangeMeters
                ? locationOptions.rangeMeters
                : (_b = (_a = ctx.user) === null || _a === void 0 ? void 0 : _a.prefs.mapRange) !== null && _b !== void 0 ? _b : arguments_1.defaultRangeMeters));
        }
        if (topics)
            queries.push(...topics.map((topic) => appwrite_1.Queries.monument.search('topics', topic)));
        if (transports)
            queries.push(...transports.map((transport) => appwrite_1.Queries.monument.search('transports', transport)));
        if (name)
            queries.push(appwrite_1.Queries.monument.search('name', name));
        if (limit)
            queries.push(appwrite_1.Queries.monument.limit(limit));
        if (userId)
            queries.push(appwrite_1.Queries.monument.equal('userId', userId));
        if (offset)
            queries.push(appwrite_1.Queries.monument.offset(offset));
        return (0, experiences_monuments_1.fromLatDocumentLongIntoLocationDocument)(...(yield collections.monument.listDocuments(queries)).documents);
    }),
});
