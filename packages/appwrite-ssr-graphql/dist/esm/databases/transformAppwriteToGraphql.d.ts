import { Models } from 'appwrite';
import { Types } from '../types/Types';
export declare const transformAppwriteToGraphql: <Type extends Types.Document<{}>>() => (...documents: Models.Document[]) => Type[];
export declare const transformAppwriteToGraphqlDocumentList: <Type extends Types.Document<{}>>() => (documentList: Models.DocumentList<Models.Document>) => {
    total: number;
    documents: Type[];
};
//# sourceMappingURL=transformAppwriteToGraphql.d.ts.map