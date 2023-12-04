"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queries = void 0;
const collections_1 = require("./tools/collections");
const appwrite_ssr_graphql_1 = require("@app/appwrite-ssr-graphql");
const query_1 = __importDefault(require("./tools/query"));
exports.Queries = query_1.default;
//TODO: remove ts-ignore
//@ts-ignore
const client = (0, appwrite_ssr_graphql_1.setProject)({
    endpoint: process.env.APPWRITE_ENDPOINT || '',
    projectId: process.env.APPWRITE_PROJECT_ID || '',
    apiKey: process.env.APPWRITE_API_KEY,
    hostname: process.env.SERVER_HOSTNAME || '',
});
const setCookie = (cookies) => setClient(client.setCookie(cookies));
const setSession = (session) => setClient(client.setSession(session));
const setNone = () => setClient(client.none());
const setAdmin = () => setApiKey(client.setAdmin());
const setClient = (appwrite) => {
    const collections = (0, collections_1.collectionsClient)(appwrite.Collection);
    return Object.assign({ collections, Queries: query_1.default }, appwrite);
};
const setApiKey = (appwrite) => {
    const collections = (0, collections_1.collectionsAdmin)(appwrite.Collection);
    return Object.assign({ collections, Queries: query_1.default }, appwrite);
};
exports.default = { setCookie, setSession, setNone, setAdmin };
