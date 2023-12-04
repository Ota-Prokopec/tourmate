import { Models } from 'node-appwrite';
import { GraphqlDocument, OmitDocument } from '@app/ts-types';
export declare const transformAppwriteDocumentsIntoGraphqlDocuments: <TDocument extends Models.Document>(...documents: TDocument[]) => GraphqlDocument<OmitDocument<TDocument>>[];
//# sourceMappingURL=transformer.d.ts.map