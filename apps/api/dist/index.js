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
exports.server = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./schema"));
const context_1 = require("./context");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
exports.server = new apollo_server_express_1.ApolloServer({ schema: schema_1.default, context: context_1.context });
const app = (0, express_1.default)();
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.server.start();
    exports.server.applyMiddleware({
        app,
        path: '/graphql',
        cors: false,
        bodyParserConfig: { limit: '50mb' },
    });
});
const clientHostName = process.env.CLIENT_HOSTNAME;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        clientHostName,
        'https://experiences-web-lovat.vercel.app',
        'https://studio.apollographql.com',
        'https://sdz3jzhr-4444.euw.devtunnels.ms',
    ],
    credentials: true,
}));
app.get('/', (req, res) => res.send('This is experiences api graphql'));
start();
const port = process.env.PORT || 4444;
app.listen(port);
exports.default = app;
