"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appwrite_ssr_graphql_1 = require("@app/appwrite-ssr-graphql");
const query = {
    userInfo: (0, appwrite_ssr_graphql_1.Query)(),
    experience: (0, appwrite_ssr_graphql_1.Query)(),
    monument: (0, appwrite_ssr_graphql_1.Query)(),
    placeDetail: (0, appwrite_ssr_graphql_1.Query)(),
    token: (0, appwrite_ssr_graphql_1.Query)(),
    monumentLike: (0, appwrite_ssr_graphql_1.Query)(),
    experienceLike: (0, appwrite_ssr_graphql_1.Query)(),
    answerTypeNumber: (0, appwrite_ssr_graphql_1.Query)(),
    answerTypeText: (0, appwrite_ssr_graphql_1.Query)(),
    answerTypeRadio: (0, appwrite_ssr_graphql_1.Query)(),
    question: (0, appwrite_ssr_graphql_1.Query)(),
    usersAnswer: (0, appwrite_ssr_graphql_1.Query)(),
};
exports.default = query;
