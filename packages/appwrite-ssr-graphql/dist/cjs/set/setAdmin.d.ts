import { Client, Users, Functions, Graphql, Health, Locale, Avatars } from 'node-appwrite';
declare const _default: (client: Client) => {
    users: Users;
    avatars: Avatars;
    functions: Functions;
    graphql: Graphql;
    health: Health;
    locale: Locale;
    Collection: {
        new <TDocumentGet extends import("..").Types.Document<{}>, TDocumentCreate extends Record<string, import("..").Types.DatabaseValue>>(databaseId: string, collectionId: string): {
            atg: (...documents: import("appwrite").Models.Document[]) => TDocumentGet[];
            atgDocumentList: (documentList: import("appwrite").Models.DocumentList<import("appwrite").Models.Document>) => {
                total: number;
                documents: TDocumentGet[];
            };
            databaseId: string;
            collectionId: string;
            createDocument(data: TDocumentCreate, permissions?: import("node-appwrite").Models.User<{}>[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
            createDocument(data: TDocumentCreate, permissions?: string[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
            updateDocument<TData extends TDocumentGet>(documentId: string, data: {} | Partial<TDocumentCreate> | undefined, permissions: string[] | undefined): Promise<TDocumentGet>;
            updateDocument<TData_1 extends TDocumentGet>(document: {} & import("..").Types.DocumentSkeleton, data: {} | Partial<TDocumentCreate> | undefined, permissions: string[] | undefined): Promise<TDocumentGet>;
            updatePermissions<TData_2 extends TDocumentGet>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet>;
            updatePermissions<TData_3 extends TDocumentGet>(document: {} & import("..").Types.DocumentSkeleton, permissions: string[] | undefined): Promise<TDocumentGet>;
            deleteDocument(filters: string[]): Promise<string>;
            deleteDocument(document: TDocumentGet): Promise<string>;
            deleteDocument(documentId: string): Promise<string>;
            deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
            getDocument(documentId: string): Promise<TDocumentGet | null>;
            getDocument(queries: string[]): Promise<TDocumentGet | null>;
            listDocuments<TData_4 extends TDocumentGet>(filters?: string[], offset?: number, limit?: number, orderType?: "ASC" | "DESC" | null): Promise<{
                total: number;
                documents: TDocumentGet[];
            }>;
            delete(): Promise<string>;
            listCollections(): Promise<import("node-appwrite").Models.CollectionList>;
            list(): Promise<import("node-appwrite").Models.DatabaseList>;
            create(name: string): Promise<import("node-appwrite").Models.Database>;
            get(): Promise<import("node-appwrite").Models.Database>;
            update(name: string): Promise<import("node-appwrite").Models.Database>;
            createCollection(collectionId: string, collectionName: string): Promise<import("node-appwrite").Models.Collection>;
            getCollection(collectionId: string): Promise<import("node-appwrite").Models.Collection>;
            updateCollection(collectionId: string, collectionName: string): Promise<import("node-appwrite").Models.Collection>;
            deleteCollection(collectionId: string): Promise<string>;
            listAttributes(collectionId: string): Promise<import("node-appwrite").Models.AttributeList>;
            getAttribute(attributeName: keyof TDocumentGet): Promise<any>;
            deleteAttribute(attributeName: keyof TDocumentGet): Promise<string>;
            updateRelationship(relationshipAttribute: keyof TDocumentGet): Promise<import("node-appwrite").Models.AttributeRelationship>;
            listIndexes(): Promise<import("node-appwrite").Models.IndexList>;
            createIndex(key: string, type: import("..").Types.IndexTypes, attributes: (keyof TDocumentGet)[]): Promise<import("node-appwrite").Models.Index>;
            getIndex(key: string): Promise<import("node-appwrite").Models.Index>;
            deleteIndex(key: string): Promise<string>;
        };
    };
};
export default _default;
//# sourceMappingURL=setAdmin.d.ts.map