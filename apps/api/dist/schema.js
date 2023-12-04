"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const path_1 = require("path");
const resolvers = __importStar(require("./resolvers/index"));
const schema = __importStar(require("./schema/index"));
const scalarTypes = __importStar(require("./lib/types/index"));
const args = __importStar(require("./arguments/index"));
exports.default = (0, nexus_1.makeSchema)({
    types: [schema, scalarTypes, args, resolvers],
    outputs: {
        typegen: (0, path_1.join)(__dirname, 'generated/nexus-typegen.ts'), // 2
        schema: (0, path_1.join)(__dirname, 'generated/schema.graphql'), // 3
    },
    contextType: {
        module: (0, path_1.join)(__dirname, './context.ts'),
        export: 'Context',
    },
    nonNullDefaults: {
        output: true,
        input: true,
    },
});
