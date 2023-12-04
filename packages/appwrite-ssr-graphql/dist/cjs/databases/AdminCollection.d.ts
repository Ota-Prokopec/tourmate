import { Client, Models } from 'node-appwrite';
import { Types } from '../types/Types';
type Document = Types.Document<{}>;
declare const _default: (client: Client) => {
    new <TDocumentGet extends Types.Document<{}>, TDocumentCreate extends Record<string, Types.DatabaseValue>>(databaseId: string, collectionId: string): {
        atg: (...documents: import("appwrite").Models.Document[]) => TDocumentGet[];
        atgDocumentList: (documentList: import("appwrite").Models.DocumentList<import("appwrite").Models.Document>) => {
            total: number;
            documents: TDocumentGet[];
        };
        databaseId: string;
        collectionId: string;
        createDocument(data: TDocumentCreate, permissions?: Models.User<{}>[], id?: string): Promise<TDocumentGet>;
        createDocument(data: TDocumentCreate, permissions?: string[], id?: string): Promise<TDocumentGet>;
        updateDocument<TData extends TDocumentGet>(documentId: string, data: {} | Partial<TDocumentCreate> | undefined, permissions: string[] | undefined): Promise<TDocumentGet>;
        updateDocument<TData_1 extends TDocumentGet>(document: Document, data: {} | Partial<TDocumentCreate> | undefined, permissions: string[] | undefined): Promise<TDocumentGet>;
        updatePermissions<TData_2 extends TDocumentGet>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet>;
        updatePermissions<TData_3 extends TDocumentGet>(document: Document, permissions: string[] | undefined): Promise<TDocumentGet>;
        deleteDocument(filters: string[]): Promise<string>;
        deleteDocument(document: TDocumentGet): Promise<string>;
        deleteDocument(documentId: string): Promise<string>;
        deleteDocuments(filters?: string[]): Promise<string[]>;
        getDocument(documentId: string): Promise<TDocumentGet | null>;
        getDocument(queries: string[]): Promise<TDocumentGet | null>;
        listDocuments<TData_4 extends TDocumentGet>(filters?: string[], offset?: number, limit?: number, orderType?: 'ASC' | 'DESC' | null): Promise<{
            total: number;
            documents: TDocumentGet[];
        }>;
        delete(): Promise<string>;
        listCollections(): Promise<Models.CollectionList>;
        list(): Promise<Models.DatabaseList>;
        create(name: string): Promise<Models.Database>;
        get(): Promise<Models.Database>;
        update(name: string): Promise<Models.Database>;
        createCollection(collectionId: string, collectionName: string): Promise<Models.Collection>;
        getCollection(collectionId: string): Promise<Models.Collection>;
        updateCollection(collectionId: string, collectionName: string): Promise<Models.Collection>;
        deleteCollection(collectionId: string): Promise<string>;
        listAttributes(collectionId: string): Promise<Models.AttributeList>;
        getAttribute(attributeName: keyof TDocumentGet): Promise<any>;
        deleteAttribute(attributeName: keyof TDocumentGet): Promise<string>;
        updateRelationship(relationshipAttribute: keyof TDocumentGet): Promise<Models.AttributeRelationship>;
        listIndexes(): Promise<Models.IndexList>;
        createIndex(key: string, type: Types.IndexTypes, attributes: (keyof TDocumentGet)[]): Promise<Models.Index>;
        getIndex(key: string): Promise<Models.Index>;
        deleteIndex(key: string): Promise<string>;
    };
};
export default _default;
//# sourceMappingURL=AdminCollection.d.ts.map