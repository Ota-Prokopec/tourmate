/// <reference types="node-appwrite" />
import { setProject } from './connection';
import type { Types } from './types/Types';
import { getSessionFromCookie } from './auth/account';
import * as appwrite from 'appwrite';
import Query from './queries/query';
import { transformAppwriteDocumentsIntoGraphqlDocuments } from './databases/transformer';
import * as permissions from '@app/appwrite-permissions';
import { appwriteGraphqlKeys, appwriteKeys } from './databases/appwriteKeys';
declare const _default: {
    setProject: (params: {
        projectId: string;
        endpoint: string;
        apiKey?: string | undefined;
        hostname: string;
    }) => {
        setSession: (session: string) => {
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
                    get<Preferences extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences>>;
                    create<Preferences_1 extends appwrite.Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<appwrite.Models.User<Preferences_1>>;
                    updateEmail<Preferences_2 extends appwrite.Models.Preferences>(email: string, password: string): Promise<appwrite.Models.User<Preferences_2>>;
                    listIdentities(queries?: string | undefined): Promise<appwrite.Models.IdentityList>;
                    deleteIdentity(identityId: string): Promise<{}>;
                    createJWT(): Promise<appwrite.Models.Jwt>;
                    listLogs(queries?: string[] | undefined): Promise<appwrite.Models.LogList>;
                    updateName<Preferences_3 extends appwrite.Models.Preferences>(name: string): Promise<appwrite.Models.User<Preferences_3>>;
                    updatePassword<Preferences_4 extends appwrite.Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<appwrite.Models.User<Preferences_4>>;
                    updatePhone<Preferences_5 extends appwrite.Models.Preferences>(phone: string, password: string): Promise<appwrite.Models.User<Preferences_5>>;
                    getPrefs<Preferences_6 extends appwrite.Models.Preferences>(): Promise<Preferences_6>;
                    updatePrefs<Preferences_7 extends appwrite.Models.Preferences>(prefs: Partial<Preferences_7>): Promise<appwrite.Models.User<Preferences_7>>;
                    createRecovery(email: string, url: string): Promise<appwrite.Models.Token>;
                    updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<appwrite.Models.Token>;
                    listSessions(): Promise<appwrite.Models.SessionList>;
                    deleteSessions(): Promise<{}>;
                    createAnonymousSession(): Promise<appwrite.Models.Session>;
                    createEmailSession(email: string, password: string): Promise<appwrite.Models.Session>;
                    createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<appwrite.Models.Token>;
                    updateMagicURLSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                    createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
                    createPhoneSession(userId: string, phone: string): Promise<appwrite.Models.Token>;
                    updatePhoneSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                    getSession(sessionId: string): Promise<appwrite.Models.Session>;
                    updateSession(sessionId: string): Promise<appwrite.Models.Session>;
                    deleteSession(sessionId: string): Promise<{}>;
                    updateStatus<Preferences_8 extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences_8>>;
                    createVerification(url: string): Promise<appwrite.Models.Token>;
                    updateVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                    createPhoneVerification(): Promise<appwrite.Models.Token>;
                    updatePhoneVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                    client: appwrite.Client;
                };
                CHUNK_SIZE: number;
                flatten(data: appwrite.Payload, prefix?: string | undefined): appwrite.Payload;
            };
            Collection: {
                new <TDocumentGet extends Types.Document<{}>, TDocumentCreate extends Record<string, Types.DatabaseValue>>(databaseId: string, collectionId: string): {
                    atg: (...documents: appwrite.Models.Document[]) => TDocumentGet[];
                    atgDocumentList: (documentList: appwrite.Models.DocumentList<appwrite.Models.Document>) => {
                        total: number;
                        documents: TDocumentGet[];
                    };
                    databaseId: string;
                    collectionId: string;
                    createDocument(data: TDocumentCreate, permissions?: appwrite.Models.User<{}>[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
                    createDocument(data: TDocumentCreate, permissions?: string[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
                    updateDocument<TData extends TDocumentGet>(documentId: string, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
                    updateDocument<TData_1 extends TDocumentGet>(document: {} & Types.DocumentSkeleton, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
                    updatePermissions<TData_2 extends TDocumentGet>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet>;
                    updatePermissions<TData_3 extends TDocumentGet>(document: {} & Types.DocumentSkeleton, permissions: string[] | undefined): Promise<TDocumentGet>;
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
                    getFile(fileId: string): Promise<appwrite.Models.File>;
                    getParamsFromURL(URL: string): {
                        fileId: string | undefined;
                        bucketId: string | undefined;
                    };
                    createFile(base64: string, permissions?: string[] | undefined, filename?: string, type?: string, fileId?: string): Promise<appwrite.Models.File>;
                    deleteFile(file: string | appwrite.Models.File): Promise<{}>;
                    listFiles(): Promise<appwrite.Models.FileList>;
                    updateFile(id: string, name: string, permissions: string[] | undefined): Promise<appwrite.Models.File>;
                    updateFile(file: appwrite.Models.File, name: string, permissions: string[] | undefined): Promise<appwrite.Models.File>;
                    getFilePreview(file: string | appwrite.Models.File): URL;
                    getFileDownload(file: string | appwrite.Models.File): URL;
                    getFileView(file: string | appwrite.Models.File): URL;
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
                get<Preferences extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences>>;
                create<Preferences_1 extends appwrite.Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<appwrite.Models.User<Preferences_1>>;
                updateEmail<Preferences_2 extends appwrite.Models.Preferences>(email: string, password: string): Promise<appwrite.Models.User<Preferences_2>>;
                listIdentities(queries?: string | undefined): Promise<appwrite.Models.IdentityList>;
                deleteIdentity(identityId: string): Promise<{}>;
                createJWT(): Promise<appwrite.Models.Jwt>;
                listLogs(queries?: string[] | undefined): Promise<appwrite.Models.LogList>;
                updateName<Preferences_3 extends appwrite.Models.Preferences>(name: string): Promise<appwrite.Models.User<Preferences_3>>;
                updatePassword<Preferences_4 extends appwrite.Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<appwrite.Models.User<Preferences_4>>;
                updatePhone<Preferences_5 extends appwrite.Models.Preferences>(phone: string, password: string): Promise<appwrite.Models.User<Preferences_5>>;
                getPrefs<Preferences_6 extends appwrite.Models.Preferences>(): Promise<Preferences_6>;
                updatePrefs<Preferences_7 extends appwrite.Models.Preferences>(prefs: Partial<Preferences_7>): Promise<appwrite.Models.User<Preferences_7>>;
                createRecovery(email: string, url: string): Promise<appwrite.Models.Token>;
                updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<appwrite.Models.Token>;
                listSessions(): Promise<appwrite.Models.SessionList>;
                deleteSessions(): Promise<{}>;
                createAnonymousSession(): Promise<appwrite.Models.Session>;
                createEmailSession(email: string, password: string): Promise<appwrite.Models.Session>;
                createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<appwrite.Models.Token>;
                updateMagicURLSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
                createPhoneSession(userId: string, phone: string): Promise<appwrite.Models.Token>;
                updatePhoneSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                getSession(sessionId: string): Promise<appwrite.Models.Session>;
                updateSession(sessionId: string): Promise<appwrite.Models.Session>;
                deleteSession(sessionId: string): Promise<{}>;
                updateStatus<Preferences_8 extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences_8>>;
                createVerification(url: string): Promise<appwrite.Models.Token>;
                updateVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                createPhoneVerification(): Promise<appwrite.Models.Token>;
                updatePhoneVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                client: appwrite.Client;
            };
            teams: appwrite.Teams;
            functions: appwrite.Functions;
            locale: import("./locale/locale").default;
            avatars: appwrite.Avatars;
            graphql: appwrite.Graphql;
            databases: appwrite.Databases;
            client: appwrite.Client;
        };
        setCookie: (cookies: Types.Cookie[]) => {
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
                    get<Preferences extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences>>;
                    create<Preferences_1 extends appwrite.Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<appwrite.Models.User<Preferences_1>>;
                    updateEmail<Preferences_2 extends appwrite.Models.Preferences>(email: string, password: string): Promise<appwrite.Models.User<Preferences_2>>;
                    listIdentities(queries?: string | undefined): Promise<appwrite.Models.IdentityList>;
                    deleteIdentity(identityId: string): Promise<{}>;
                    createJWT(): Promise<appwrite.Models.Jwt>;
                    listLogs(queries?: string[] | undefined): Promise<appwrite.Models.LogList>;
                    updateName<Preferences_3 extends appwrite.Models.Preferences>(name: string): Promise<appwrite.Models.User<Preferences_3>>;
                    updatePassword<Preferences_4 extends appwrite.Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<appwrite.Models.User<Preferences_4>>;
                    updatePhone<Preferences_5 extends appwrite.Models.Preferences>(phone: string, password: string): Promise<appwrite.Models.User<Preferences_5>>;
                    getPrefs<Preferences_6 extends appwrite.Models.Preferences>(): Promise<Preferences_6>;
                    updatePrefs<Preferences_7 extends appwrite.Models.Preferences>(prefs: Partial<Preferences_7>): Promise<appwrite.Models.User<Preferences_7>>;
                    createRecovery(email: string, url: string): Promise<appwrite.Models.Token>;
                    updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<appwrite.Models.Token>;
                    listSessions(): Promise<appwrite.Models.SessionList>;
                    deleteSessions(): Promise<{}>;
                    createAnonymousSession(): Promise<appwrite.Models.Session>;
                    createEmailSession(email: string, password: string): Promise<appwrite.Models.Session>;
                    createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<appwrite.Models.Token>;
                    updateMagicURLSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                    createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
                    createPhoneSession(userId: string, phone: string): Promise<appwrite.Models.Token>;
                    updatePhoneSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                    getSession(sessionId: string): Promise<appwrite.Models.Session>;
                    updateSession(sessionId: string): Promise<appwrite.Models.Session>;
                    deleteSession(sessionId: string): Promise<{}>;
                    updateStatus<Preferences_8 extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences_8>>;
                    createVerification(url: string): Promise<appwrite.Models.Token>;
                    updateVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                    createPhoneVerification(): Promise<appwrite.Models.Token>;
                    updatePhoneVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                    client: appwrite.Client;
                };
                CHUNK_SIZE: number;
                flatten(data: appwrite.Payload, prefix?: string | undefined): appwrite.Payload;
            };
            Collection: {
                new <TDocumentGet extends Types.Document<{}>, TDocumentCreate extends Record<string, Types.DatabaseValue>>(databaseId: string, collectionId: string): {
                    atg: (...documents: appwrite.Models.Document[]) => TDocumentGet[];
                    atgDocumentList: (documentList: appwrite.Models.DocumentList<appwrite.Models.Document>) => {
                        total: number;
                        documents: TDocumentGet[];
                    };
                    databaseId: string;
                    collectionId: string;
                    createDocument(data: TDocumentCreate, permissions?: appwrite.Models.User<{}>[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
                    createDocument(data: TDocumentCreate, permissions?: string[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
                    updateDocument<TData extends TDocumentGet>(documentId: string, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
                    updateDocument<TData_1 extends TDocumentGet>(document: {} & Types.DocumentSkeleton, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
                    updatePermissions<TData_2 extends TDocumentGet>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet>;
                    updatePermissions<TData_3 extends TDocumentGet>(document: {} & Types.DocumentSkeleton, permissions: string[] | undefined): Promise<TDocumentGet>;
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
                    getFile(fileId: string): Promise<appwrite.Models.File>;
                    getParamsFromURL(URL: string): {
                        fileId: string | undefined;
                        bucketId: string | undefined;
                    };
                    createFile(base64: string, permissions?: string[] | undefined, filename?: string, type?: string, fileId?: string): Promise<appwrite.Models.File>;
                    deleteFile(file: string | appwrite.Models.File): Promise<{}>;
                    listFiles(): Promise<appwrite.Models.FileList>;
                    updateFile(id: string, name: string, permissions: string[] | undefined): Promise<appwrite.Models.File>;
                    updateFile(file: appwrite.Models.File, name: string, permissions: string[] | undefined): Promise<appwrite.Models.File>;
                    getFilePreview(file: string | appwrite.Models.File): URL;
                    getFileDownload(file: string | appwrite.Models.File): URL;
                    getFileView(file: string | appwrite.Models.File): URL;
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
                get<Preferences extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences>>;
                create<Preferences_1 extends appwrite.Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<appwrite.Models.User<Preferences_1>>;
                updateEmail<Preferences_2 extends appwrite.Models.Preferences>(email: string, password: string): Promise<appwrite.Models.User<Preferences_2>>;
                listIdentities(queries?: string | undefined): Promise<appwrite.Models.IdentityList>;
                deleteIdentity(identityId: string): Promise<{}>;
                createJWT(): Promise<appwrite.Models.Jwt>;
                listLogs(queries?: string[] | undefined): Promise<appwrite.Models.LogList>;
                updateName<Preferences_3 extends appwrite.Models.Preferences>(name: string): Promise<appwrite.Models.User<Preferences_3>>;
                updatePassword<Preferences_4 extends appwrite.Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<appwrite.Models.User<Preferences_4>>;
                updatePhone<Preferences_5 extends appwrite.Models.Preferences>(phone: string, password: string): Promise<appwrite.Models.User<Preferences_5>>;
                getPrefs<Preferences_6 extends appwrite.Models.Preferences>(): Promise<Preferences_6>;
                updatePrefs<Preferences_7 extends appwrite.Models.Preferences>(prefs: Partial<Preferences_7>): Promise<appwrite.Models.User<Preferences_7>>;
                createRecovery(email: string, url: string): Promise<appwrite.Models.Token>;
                updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<appwrite.Models.Token>;
                listSessions(): Promise<appwrite.Models.SessionList>;
                deleteSessions(): Promise<{}>;
                createAnonymousSession(): Promise<appwrite.Models.Session>;
                createEmailSession(email: string, password: string): Promise<appwrite.Models.Session>;
                createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<appwrite.Models.Token>;
                updateMagicURLSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
                createPhoneSession(userId: string, phone: string): Promise<appwrite.Models.Token>;
                updatePhoneSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                getSession(sessionId: string): Promise<appwrite.Models.Session>;
                updateSession(sessionId: string): Promise<appwrite.Models.Session>;
                deleteSession(sessionId: string): Promise<{}>;
                updateStatus<Preferences_8 extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences_8>>;
                createVerification(url: string): Promise<appwrite.Models.Token>;
                updateVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                createPhoneVerification(): Promise<appwrite.Models.Token>;
                updatePhoneVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                client: appwrite.Client;
            };
            teams: appwrite.Teams;
            functions: appwrite.Functions;
            locale: import("./locale/locale").default;
            avatars: appwrite.Avatars;
            graphql: appwrite.Graphql;
            databases: appwrite.Databases;
            client: appwrite.Client;
        };
        none: () => {
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
                    get<Preferences extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences>>;
                    create<Preferences_1 extends appwrite.Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<appwrite.Models.User<Preferences_1>>;
                    updateEmail<Preferences_2 extends appwrite.Models.Preferences>(email: string, password: string): Promise<appwrite.Models.User<Preferences_2>>;
                    listIdentities(queries?: string | undefined): Promise<appwrite.Models.IdentityList>;
                    deleteIdentity(identityId: string): Promise<{}>;
                    createJWT(): Promise<appwrite.Models.Jwt>;
                    listLogs(queries?: string[] | undefined): Promise<appwrite.Models.LogList>;
                    updateName<Preferences_3 extends appwrite.Models.Preferences>(name: string): Promise<appwrite.Models.User<Preferences_3>>;
                    updatePassword<Preferences_4 extends appwrite.Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<appwrite.Models.User<Preferences_4>>;
                    updatePhone<Preferences_5 extends appwrite.Models.Preferences>(phone: string, password: string): Promise<appwrite.Models.User<Preferences_5>>;
                    getPrefs<Preferences_6 extends appwrite.Models.Preferences>(): Promise<Preferences_6>;
                    updatePrefs<Preferences_7 extends appwrite.Models.Preferences>(prefs: Partial<Preferences_7>): Promise<appwrite.Models.User<Preferences_7>>;
                    createRecovery(email: string, url: string): Promise<appwrite.Models.Token>;
                    updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<appwrite.Models.Token>;
                    listSessions(): Promise<appwrite.Models.SessionList>;
                    deleteSessions(): Promise<{}>;
                    createAnonymousSession(): Promise<appwrite.Models.Session>;
                    createEmailSession(email: string, password: string): Promise<appwrite.Models.Session>;
                    createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<appwrite.Models.Token>;
                    updateMagicURLSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                    createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
                    createPhoneSession(userId: string, phone: string): Promise<appwrite.Models.Token>;
                    updatePhoneSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                    getSession(sessionId: string): Promise<appwrite.Models.Session>;
                    updateSession(sessionId: string): Promise<appwrite.Models.Session>;
                    deleteSession(sessionId: string): Promise<{}>;
                    updateStatus<Preferences_8 extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences_8>>;
                    createVerification(url: string): Promise<appwrite.Models.Token>;
                    updateVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                    createPhoneVerification(): Promise<appwrite.Models.Token>;
                    updatePhoneVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                    client: appwrite.Client;
                };
                CHUNK_SIZE: number;
                flatten(data: appwrite.Payload, prefix?: string | undefined): appwrite.Payload;
            };
            Collection: {
                new <TDocumentGet extends Types.Document<{}>, TDocumentCreate extends Record<string, Types.DatabaseValue>>(databaseId: string, collectionId: string): {
                    atg: (...documents: appwrite.Models.Document[]) => TDocumentGet[];
                    atgDocumentList: (documentList: appwrite.Models.DocumentList<appwrite.Models.Document>) => {
                        total: number;
                        documents: TDocumentGet[];
                    };
                    databaseId: string;
                    collectionId: string;
                    createDocument(data: TDocumentCreate, permissions?: appwrite.Models.User<{}>[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
                    createDocument(data: TDocumentCreate, permissions?: string[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
                    updateDocument<TData extends TDocumentGet>(documentId: string, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
                    updateDocument<TData_1 extends TDocumentGet>(document: {} & Types.DocumentSkeleton, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
                    updatePermissions<TData_2 extends TDocumentGet>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet>;
                    updatePermissions<TData_3 extends TDocumentGet>(document: {} & Types.DocumentSkeleton, permissions: string[] | undefined): Promise<TDocumentGet>;
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
                    getFile(fileId: string): Promise<appwrite.Models.File>;
                    getParamsFromURL(URL: string): {
                        fileId: string | undefined;
                        bucketId: string | undefined;
                    };
                    createFile(base64: string, permissions?: string[] | undefined, filename?: string, type?: string, fileId?: string): Promise<appwrite.Models.File>;
                    deleteFile(file: string | appwrite.Models.File): Promise<{}>;
                    listFiles(): Promise<appwrite.Models.FileList>;
                    updateFile(id: string, name: string, permissions: string[] | undefined): Promise<appwrite.Models.File>;
                    updateFile(file: appwrite.Models.File, name: string, permissions: string[] | undefined): Promise<appwrite.Models.File>;
                    getFilePreview(file: string | appwrite.Models.File): URL;
                    getFileDownload(file: string | appwrite.Models.File): URL;
                    getFileView(file: string | appwrite.Models.File): URL;
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
                get<Preferences extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences>>;
                create<Preferences_1 extends appwrite.Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<appwrite.Models.User<Preferences_1>>;
                updateEmail<Preferences_2 extends appwrite.Models.Preferences>(email: string, password: string): Promise<appwrite.Models.User<Preferences_2>>;
                listIdentities(queries?: string | undefined): Promise<appwrite.Models.IdentityList>;
                deleteIdentity(identityId: string): Promise<{}>;
                createJWT(): Promise<appwrite.Models.Jwt>;
                listLogs(queries?: string[] | undefined): Promise<appwrite.Models.LogList>;
                updateName<Preferences_3 extends appwrite.Models.Preferences>(name: string): Promise<appwrite.Models.User<Preferences_3>>;
                updatePassword<Preferences_4 extends appwrite.Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<appwrite.Models.User<Preferences_4>>;
                updatePhone<Preferences_5 extends appwrite.Models.Preferences>(phone: string, password: string): Promise<appwrite.Models.User<Preferences_5>>;
                getPrefs<Preferences_6 extends appwrite.Models.Preferences>(): Promise<Preferences_6>;
                updatePrefs<Preferences_7 extends appwrite.Models.Preferences>(prefs: Partial<Preferences_7>): Promise<appwrite.Models.User<Preferences_7>>;
                createRecovery(email: string, url: string): Promise<appwrite.Models.Token>;
                updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<appwrite.Models.Token>;
                listSessions(): Promise<appwrite.Models.SessionList>;
                deleteSessions(): Promise<{}>;
                createAnonymousSession(): Promise<appwrite.Models.Session>;
                createEmailSession(email: string, password: string): Promise<appwrite.Models.Session>;
                createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<appwrite.Models.Token>;
                updateMagicURLSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
                createPhoneSession(userId: string, phone: string): Promise<appwrite.Models.Token>;
                updatePhoneSession(userId: string, secret: string): Promise<appwrite.Models.Session>;
                getSession(sessionId: string): Promise<appwrite.Models.Session>;
                updateSession(sessionId: string): Promise<appwrite.Models.Session>;
                deleteSession(sessionId: string): Promise<{}>;
                updateStatus<Preferences_8 extends appwrite.Models.Preferences>(): Promise<appwrite.Models.User<Preferences_8>>;
                createVerification(url: string): Promise<appwrite.Models.Token>;
                updateVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                createPhoneVerification(): Promise<appwrite.Models.Token>;
                updatePhoneVerification(userId: string, secret: string): Promise<appwrite.Models.Token>;
                client: appwrite.Client;
            };
            teams: appwrite.Teams;
            functions: appwrite.Functions;
            locale: import("./locale/locale").default;
            avatars: appwrite.Avatars;
            graphql: appwrite.Graphql;
            databases: appwrite.Databases;
            client: appwrite.Client;
        };
        setAdmin: () => {
            users: import("node-appwrite").Users;
            avatars: import("node-appwrite").Avatars;
            functions: import("node-appwrite").Functions;
            graphql: import("node-appwrite").Graphql;
            health: import("node-appwrite").Health;
            locale: import("node-appwrite").Locale;
            Collection: {
                new <TDocumentGet_1 extends Types.Document<{}>, TDocumentCreate_1 extends Record<string, Types.DatabaseValue>>(databaseId: string, collectionId: string): {
                    atg: (...documents: appwrite.Models.Document[]) => TDocumentGet_1[];
                    atgDocumentList: (documentList: appwrite.Models.DocumentList<appwrite.Models.Document>) => {
                        total: number;
                        documents: TDocumentGet_1[];
                    };
                    databaseId: string;
                    collectionId: string;
                    createDocument(data: TDocumentCreate_1, permissions?: import("node-appwrite").Models.User<{}>[] | undefined, id?: string | undefined): Promise<TDocumentGet_1>;
                    createDocument(data: TDocumentCreate_1, permissions?: string[] | undefined, id?: string | undefined): Promise<TDocumentGet_1>;
                    updateDocument<TData_5 extends TDocumentGet_1>(documentId: string, data: {} | Partial<TDocumentCreate_1> | undefined, permissions: string[] | undefined): Promise<TDocumentGet_1>;
                    updateDocument<TData_6 extends TDocumentGet_1>(document: {} & Types.DocumentSkeleton, data: {} | Partial<TDocumentCreate_1> | undefined, permissions: string[] | undefined): Promise<TDocumentGet_1>;
                    updatePermissions<TData_7 extends TDocumentGet_1>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet_1>;
                    updatePermissions<TData_8 extends TDocumentGet_1>(document: {} & Types.DocumentSkeleton, permissions: string[] | undefined): Promise<TDocumentGet_1>;
                    deleteDocument(filters: string[]): Promise<string>;
                    deleteDocument(document: TDocumentGet_1): Promise<string>;
                    deleteDocument(documentId: string): Promise<string>;
                    deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                    getDocument(documentId: string): Promise<TDocumentGet_1 | null>;
                    getDocument(queries: string[]): Promise<TDocumentGet_1 | null>;
                    listDocuments<TData_9 extends TDocumentGet_1>(filters?: string[], offset?: number, limit?: number, orderType?: "ASC" | "DESC" | null): Promise<{
                        total: number;
                        documents: TDocumentGet_1[];
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
                    getAttribute(attributeName: keyof TDocumentGet_1): Promise<any>;
                    deleteAttribute(attributeName: keyof TDocumentGet_1): Promise<string>;
                    updateRelationship(relationshipAttribute: keyof TDocumentGet_1): Promise<import("node-appwrite").Models.AttributeRelationship>;
                    listIndexes(): Promise<import("node-appwrite").Models.IndexList>;
                    createIndex(key: string, type: Types.IndexTypes, attributes: (keyof TDocumentGet_1)[]): Promise<import("node-appwrite").Models.Index>;
                    getIndex(key: string): Promise<import("node-appwrite").Models.Index>;
                    deleteIndex(key: string): Promise<string>;
                };
            };
        };
    };
};
export default _default;
export { permissions, getSessionFromCookie, appwrite, Query, transformAppwriteDocumentsIntoGraphqlDocuments, };
export { setProject, appwriteGraphqlKeys, appwriteKeys };
export type { Types };
//# sourceMappingURL=index.d.ts.map