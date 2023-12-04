/// <reference types="qs" />
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
export declare const server: ApolloServer<{
    res: express.Response<any, Record<string, any>>;
    req: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
}>;
declare const app: import("express-serve-static-core").Express;
export default app;
//# sourceMappingURL=index.d.ts.map