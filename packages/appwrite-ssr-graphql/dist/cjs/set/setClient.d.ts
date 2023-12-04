import { Avatars, Client, Databases, Functions, Graphql, Teams } from 'appwrite';
import Locale from '../locale/locale';
declare const _default: (client: Client, hostname: string) => {
    Auth: {
        new (): {
            loginViaEmail(email: string, password: string): Promise<{
                sessionToken: {
                    name: string;
                    domain: string;
                    path: string;
                    value: string;
                    expires?: Date | undefined;
                    maxAge?: number | undefined;
                    secure?: boolean | undefined;
                    httpOnly?: boolean | undefined;
                    sameSite?: string | undefined;
                };
                sessionLegacyToken: {
                    name: string;
                    domain: string;
                    path: string;
                    value?: string | undefined;
                    expires?: Date | undefined;
                    maxAge?: number | undefined;
                    secure?: boolean | undefined;
                    httpOnly?: boolean | undefined;
                    sameSite?: string | undefined;
                };
            }>;
            createSession(callbackFetch: () => Promise<Response>): Promise<{
                sessionToken: {
                    name: string;
                    domain: string;
                    path: string;
                    value: string;
                    expires?: Date | undefined;
                    maxAge?: number | undefined;
                    secure?: boolean | undefined;
                    httpOnly?: boolean | undefined;
                    sameSite?: string | undefined;
                };
                sessionLegacyToken: {
                    name: string;
                    domain: string;
                    path: string;
                    value?: string | undefined;
                    expires?: Date | undefined;
                    maxAge?: number | undefined;
                    secure?: boolean | undefined;
                    httpOnly?: boolean | undefined;
                    sameSite?: string | undefined;
                };
            }>;
            logOut(): {
                readonly sessionToken: {
                    readonly value: "";
                    readonly name: string;
                    readonly domain: string;
                    readonly path: "/";
                };
                readonly sessionLegacyToken: {
                    readonly value: "";
                    readonly name: string;
                    readonly domain: string;
                    readonly path: "/";
                };
                readonly sessionNames: {
                    readonly token: string;
                    readonly legacyToken: string;
                };
            };
            oauth2Login(url: URL, params?: {
                domain: string;
                secure: boolean;
                path: string;
                httpOnly: boolean;
            }): {
                sessionToken: {
                    domain: string;
                    secure: boolean;
                    path: string;
                    httpOnly: boolean;
                    name: string;
                    value: string;
                };
                sessionLegacyToken: {
                    domain: string;
                    secure: boolean;
                    path: string;
                    httpOnly: boolean;
                    name: string;
                    value: string;
                };
            };
            get<Preferences extends import("appwrite").Models.Preferences>(): Promise<import("appwrite").Models.User<Preferences>>;
            create<Preferences_1 extends import("appwrite").Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<import("appwrite").Models.User<Preferences_1>>;
            updateEmail<Preferences_2 extends import("appwrite").Models.Preferences>(email: string, password: string): Promise<import("appwrite").Models.User<Preferences_2>>;
            listIdentities(queries?: string | undefined): Promise<import("appwrite").Models.IdentityList>;
            deleteIdentity(identityId: string): Promise<{}>;
            createJWT(): Promise<import("appwrite").Models.Jwt>;
            listLogs(queries?: string[] | undefined): Promise<import("appwrite").Models.LogList>;
            updateName<Preferences_3 extends import("appwrite").Models.Preferences>(name: string): Promise<import("appwrite").Models.User<Preferences_3>>;
            updatePassword<Preferences_4 extends import("appwrite").Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<import("appwrite").Models.User<Preferences_4>>;
            updatePhone<Preferences_5 extends import("appwrite").Models.Preferences>(phone: string, password: string): Promise<import("appwrite").Models.User<Preferences_5>>;
            getPrefs<Preferences_6 extends import("appwrite").Models.Preferences>(): Promise<Preferences_6>;
            updatePrefs<Preferences_7 extends import("appwrite").Models.Preferences>(prefs: Partial<Preferences_7>): Promise<import("appwrite").Models.User<Preferences_7>>;
            createRecovery(email: string, url: string): Promise<import("appwrite").Models.Token>;
            updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<import("appwrite").Models.Token>;
            listSessions(): Promise<import("appwrite").Models.SessionList>;
            deleteSessions(): Promise<{}>;
            createAnonymousSession(): Promise<import("appwrite").Models.Session>;
            createEmailSession(email: string, password: string): Promise<import("appwrite").Models.Session>;
            createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<import("appwrite").Models.Token>;
            updateMagicURLSession(userId: string, secret: string): Promise<import("appwrite").Models.Session>;
            createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
            createPhoneSession(userId: string, phone: string): Promise<import("appwrite").Models.Token>;
            updatePhoneSession(userId: string, secret: string): Promise<import("appwrite").Models.Session>;
            getSession(sessionId: string): Promise<import("appwrite").Models.Session>;
            updateSession(sessionId: string): Promise<import("appwrite").Models.Session>;
            deleteSession(sessionId: string): Promise<{}>;
            updateStatus<Preferences_8 extends import("appwrite").Models.Preferences>(): Promise<import("appwrite").Models.User<Preferences_8>>;
            createVerification(url: string): Promise<import("appwrite").Models.Token>;
            updateVerification(userId: string, secret: string): Promise<import("appwrite").Models.Token>;
            createPhoneVerification(): Promise<import("appwrite").Models.Token>;
            updatePhoneVerification(userId: string, secret: string): Promise<import("appwrite").Models.Token>;
            client: Client;
        };
        CHUNK_SIZE: number;
        flatten(data: import("appwrite/types/client").Payload, prefix?: string | undefined): import("appwrite/types/client").Payload;
    };
    Collection: {
        new <TDocumentGet extends import("..").Types.Document<{}>, TDocumentCreate extends Record<string, import("..").Types.DatabaseValue>>(databaseId: string, collectionId: string): {
            atg: (...documents: import("appwrite").Models.Document[]) => TDocumentGet[];
            atgDocumentList: (documentList: import("appwrite").Models.DocumentList<import("appwrite").Models.Document>) => {
                total: number;
                documents: TDocumentGet[];
            };
            databaseId: string;
            collectionId: string;
            createDocument(data: TDocumentCreate, permissions?: import("appwrite").Models.User<{}>[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
            createDocument(data: TDocumentCreate, permissions?: string[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
            updateDocument<TData extends TDocumentGet>(documentId: string, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
            updateDocument<TData_1 extends TDocumentGet>(document: {} & import("..").Types.DocumentSkeleton, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
            updatePermissions<TData_2 extends TDocumentGet>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet>;
            updatePermissions<TData_3 extends TDocumentGet>(document: {} & import("..").Types.DocumentSkeleton, permissions: string[] | undefined): Promise<TDocumentGet>;
            deleteDocument(filters: string[]): Promise<string>;
            deleteDocument(document: TDocumentGet): Promise<string>;
            deleteDocument(documentId: string): Promise<string>;
            deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
            deleteAllDocuments(filters?: string[]): Promise<string[]>;
            getDocument(documentId: string): Promise<TDocumentGet | null>;
            getDocument(queries: string[]): Promise<TDocumentGet | null>;
            listDocuments<TData_4 extends TDocumentGet>(filters?: string[], offset?: number, limit?: number, orderType?: "ASC" | "DESC" | null): Promise<{
                total: number;
                documents: TDocumentGet[];
            }>;
        };
    };
    Bucket: {
        new (bucketId: string): {
            bucketId: string;
            getFile(fileId: string): Promise<import("appwrite").Models.File>;
            getParamsFromURL(URL: string): {
                fileId: string | undefined;
                bucketId: string | undefined;
            };
            createFile(base64: string, permissions?: string[] | undefined, filename?: string, type?: string, fileId?: string): Promise<import("appwrite").Models.File>;
            deleteFile(file: string | import("appwrite").Models.File): Promise<{}>;
            listFiles(): Promise<import("appwrite").Models.FileList>;
            updateFile(id: string, name: string, permissions: string[] | undefined): Promise<import("appwrite").Models.File>;
            updateFile(file: import("appwrite").Models.File, name: string, permissions: string[] | undefined): Promise<import("appwrite").Models.File>;
            getFilePreview(file: string | import("appwrite").Models.File): URL;
            getFileDownload(file: string | import("appwrite").Models.File): URL;
            getFileView(file: string | import("appwrite").Models.File): URL;
            getFileURL(fileId: string): URL;
            getIdFromURL(URL: string): string | undefined;
        };
    };
    account: {
        loginViaEmail(email: string, password: string): Promise<{
            sessionToken: {
                name: string;
                domain: string;
                path: string;
                value: string;
                expires?: Date | undefined;
                maxAge?: number | undefined;
                secure?: boolean | undefined;
                httpOnly?: boolean | undefined;
                sameSite?: string | undefined;
            };
            sessionLegacyToken: {
                name: string;
                domain: string;
                path: string;
                value?: string | undefined;
                expires?: Date | undefined;
                maxAge?: number | undefined;
                secure?: boolean | undefined;
                httpOnly?: boolean | undefined;
                sameSite?: string | undefined;
            };
        }>;
        createSession(callbackFetch: () => Promise<Response>): Promise<{
            sessionToken: {
                name: string;
                domain: string;
                path: string;
                value: string;
                expires?: Date | undefined;
                maxAge?: number | undefined;
                secure?: boolean | undefined;
                httpOnly?: boolean | undefined;
                sameSite?: string | undefined;
            };
            sessionLegacyToken: {
                name: string;
                domain: string;
                path: string;
                value?: string | undefined;
                expires?: Date | undefined;
                maxAge?: number | undefined;
                secure?: boolean | undefined;
                httpOnly?: boolean | undefined;
                sameSite?: string | undefined;
            };
        }>;
        logOut(): {
            readonly sessionToken: {
                readonly value: "";
                readonly name: string;
                readonly domain: string;
                readonly path: "/";
            };
            readonly sessionLegacyToken: {
                readonly value: "";
                readonly name: string;
                readonly domain: string;
                readonly path: "/";
            };
            readonly sessionNames: {
                readonly token: string;
                readonly legacyToken: string;
            };
        };
        oauth2Login(url: URL, params?: {
            domain: string;
            secure: boolean;
            path: string;
            httpOnly: boolean;
        }): {
            sessionToken: {
                domain: string;
                secure: boolean;
                path: string;
                httpOnly: boolean;
                name: string;
                value: string;
            };
            sessionLegacyToken: {
                domain: string;
                secure: boolean;
                path: string;
                httpOnly: boolean;
                name: string;
                value: string;
            };
        };
        get<Preferences extends import("appwrite").Models.Preferences>(): Promise<import("appwrite").Models.User<Preferences>>;
        create<Preferences_1 extends import("appwrite").Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<import("appwrite").Models.User<Preferences_1>>;
        updateEmail<Preferences_2 extends import("appwrite").Models.Preferences>(email: string, password: string): Promise<import("appwrite").Models.User<Preferences_2>>;
        listIdentities(queries?: string | undefined): Promise<import("appwrite").Models.IdentityList>;
        deleteIdentity(identityId: string): Promise<{}>;
        createJWT(): Promise<import("appwrite").Models.Jwt>;
        listLogs(queries?: string[] | undefined): Promise<import("appwrite").Models.LogList>;
        updateName<Preferences_3 extends import("appwrite").Models.Preferences>(name: string): Promise<import("appwrite").Models.User<Preferences_3>>;
        updatePassword<Preferences_4 extends import("appwrite").Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<import("appwrite").Models.User<Preferences_4>>;
        updatePhone<Preferences_5 extends import("appwrite").Models.Preferences>(phone: string, password: string): Promise<import("appwrite").Models.User<Preferences_5>>;
        getPrefs<Preferences_6 extends import("appwrite").Models.Preferences>(): Promise<Preferences_6>;
        updatePrefs<Preferences_7 extends import("appwrite").Models.Preferences>(prefs: Partial<Preferences_7>): Promise<import("appwrite").Models.User<Preferences_7>>;
        createRecovery(email: string, url: string): Promise<import("appwrite").Models.Token>;
        updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<import("appwrite").Models.Token>;
        listSessions(): Promise<import("appwrite").Models.SessionList>;
        deleteSessions(): Promise<{}>;
        createAnonymousSession(): Promise<import("appwrite").Models.Session>;
        createEmailSession(email: string, password: string): Promise<import("appwrite").Models.Session>;
        createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<import("appwrite").Models.Token>;
        updateMagicURLSession(userId: string, secret: string): Promise<import("appwrite").Models.Session>;
        createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
        createPhoneSession(userId: string, phone: string): Promise<import("appwrite").Models.Token>;
        updatePhoneSession(userId: string, secret: string): Promise<import("appwrite").Models.Session>;
        getSession(sessionId: string): Promise<import("appwrite").Models.Session>;
        updateSession(sessionId: string): Promise<import("appwrite").Models.Session>;
        deleteSession(sessionId: string): Promise<{}>;
        updateStatus<Preferences_8 extends import("appwrite").Models.Preferences>(): Promise<import("appwrite").Models.User<Preferences_8>>;
        createVerification(url: string): Promise<import("appwrite").Models.Token>;
        updateVerification(userId: string, secret: string): Promise<import("appwrite").Models.Token>;
        createPhoneVerification(): Promise<import("appwrite").Models.Token>;
        updatePhoneVerification(userId: string, secret: string): Promise<import("appwrite").Models.Token>;
        client: Client;
    };
    teams: Teams;
    functions: Functions;
    locale: Locale;
    avatars: Avatars;
    graphql: Graphql;
    databases: Databases;
    client: Client;
};
export default _default;
//# sourceMappingURL=setClient.d.ts.map