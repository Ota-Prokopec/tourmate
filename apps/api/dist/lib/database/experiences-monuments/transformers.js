"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromLatDocumentLongIntoLocationDocument = void 0;
const lodash_1 = __importDefault(require("lodash"));
const { omit } = lodash_1.default;
const fromLatDocumentLongIntoLocationDocument = (...docs) => {
    return docs.map((doc) => (Object.assign(Object.assign({}, omit(doc, 'latitude', 'longitude')), {
        location: [doc.latitude, doc.longitude],
    })));
};
exports.fromLatDocumentLongIntoLocationDocument = fromLatDocumentLongIntoLocationDocument;
