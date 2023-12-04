import { Client, Models, RealtimeResponseEvent } from 'appwrite';
import { Types } from '../types/Types';
type Document = Types.Document<{}>;
declare const _default: (client: Client) => {
    new <TDocumentGet extends Types.Document<{}>, TDocumentCreate extends Record<string, Types.DatabaseValue>>(databaseId: string, collectionId: string): {
        databaseId: string;
        collectionId: string;
        createDocument(data: TDocumentCreate, permissions?: Models.User<{}>[], id?: string): Promise<TDocumentGet>;
        createDocument(data: TDocumentCreate, permissions?: string[], id?: string): Promise<TDocumentGet>;
        updateDocument<TData extends TDocumentGet>(documentId: string, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
        updateDocument<TData_1 extends TDocumentGet>(document: Document, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
        updatePermissions<TData_2 extends TDocumentGet>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet>;
        updatePermissions<TData_3 extends TDocumentGet>(document: Document, permissions: string[] | undefined): Promise<TDocumentGet>;
        deleteDocument(filters: string[]): Promise<string>;
        deleteDocument(document: TDocumentGet): Promise<string>;
        deleteDocument(documentId: string): Promise<string>;
        deleteDocuments(filters?: string[]): Promise<string[]>;
        getDocument(documentId: string): Promise<TDocumentGet | null>;
        getDocument(queries: string[]): Promise<TDocumentGet | null>;
        listDocuments<TData_4 extends TDocumentGet>(filters?: string[], offset?: number, limit?: number, orderType?: 'ASC' | 'DESC' | null): Promise<Models.DocumentList<TData_4>>;
        subscribeDocument(documentId: string, callback: (data: RealtimeResponseEvent<TDocumentGet>) => void): void;
        listenUpdate(documentId: string, callback: (data: TDocumentGet) => void): void;
    };
};
export default _default;
//# sourceMappingURL=database.d.ts.map