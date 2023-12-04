/// <reference types="qs" />
import { Request, Response } from 'express';
import { Models } from 'appwrite';
import type { Preferences } from '@app/ts-types';
import { Types } from '@app/appwrite-ssr-graphql';
export declare const context: ({ req, res }: {
    res: Response;
    req: Request;
}) => Promise<{
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    isAuthed: (ctxUser: unknown) => ctxUser is Models.User<Preferences>;
    user: Models.User<Preferences> | null;
    appwrite: {
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
                createSession(callbackFetch: () => Promise<globalThis.Response>): Promise<{
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
                } | undefined): {
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
                get<Preferences_1 extends Models.Preferences>(): Promise<Models.User<Preferences_1>>;
                create<Preferences_1 extends Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<Models.User<Preferences_1>>;
                updateEmail<Preferences_2 extends Models.Preferences>(email: string, password: string): Promise<Models.User<Preferences_2>>;
                listIdentities(queries?: string | undefined): Promise<Models.IdentityList>;
                deleteIdentity(identityId: string): Promise<{}>;
                createJWT(): Promise<Models.Jwt>;
                listLogs(queries?: string[] | undefined): Promise<Models.LogList>;
                updateName<Preferences_3 extends Models.Preferences>(name: string): Promise<Models.User<Preferences_3>>;
                updatePassword<Preferences_4 extends Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<Models.User<Preferences_4>>;
                updatePhone<Preferences_5 extends Models.Preferences>(phone: string, password: string): Promise<Models.User<Preferences_5>>;
                getPrefs<Preferences_6 extends Models.Preferences>(): Promise<Preferences_6>;
                updatePrefs<Preferences_7 extends Models.Preferences>(prefs: Partial<Preferences_7>): Promise<Models.User<Preferences_7>>;
                createRecovery(email: string, url: string): Promise<Models.Token>;
                updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<Models.Token>;
                listSessions(): Promise<Models.SessionList>;
                deleteSessions(): Promise<{}>;
                createAnonymousSession(): Promise<Models.Session>;
                createEmailSession(email: string, password: string): Promise<Models.Session>;
                createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<Models.Token>;
                updateMagicURLSession(userId: string, secret: string): Promise<Models.Session>;
                createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
                createPhoneSession(userId: string, phone: string): Promise<Models.Token>;
                updatePhoneSession(userId: string, secret: string): Promise<Models.Session>;
                getSession(sessionId: string): Promise<Models.Session>;
                updateSession(sessionId: string): Promise<Models.Session>;
                deleteSession(sessionId: string): Promise<{}>;
                updateStatus<Preferences_8 extends Models.Preferences>(): Promise<Models.User<Preferences_8>>;
                createVerification(url: string): Promise<Models.Token>;
                updateVerification(userId: string, secret: string): Promise<Models.Token>;
                createPhoneVerification(): Promise<Models.Token>;
                updatePhoneVerification(userId: string, secret: string): Promise<Models.Token>;
                client: import("appwrite/types/client").Client;
            };
            CHUNK_SIZE: number;
            flatten(data: import("appwrite/types/client").Payload, prefix?: string | undefined): import("appwrite/types/client").Payload;
        };
        Collection: new <TDocumentGet extends Types.Document<{}>, TDocumentCreate extends Record<string, Types.DatabaseValue>>(databaseId: string, collectionId: string) => {
            atg: (...documents: Models.Document[]) => TDocumentGet[];
            atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                total: number;
                documents: TDocumentGet[];
            };
            databaseId: string;
            collectionId: string;
            createDocument(data: TDocumentCreate, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
            createDocument(data: TDocumentCreate, permissions?: string[] | undefined, id?: string | undefined): Promise<TDocumentGet>;
            updateDocument<TData extends TDocumentGet>(documentId: string, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
            updateDocument<TData_1 extends TDocumentGet>(document: Types.DocumentSkeleton, data: {} | Partial<TDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<TDocumentGet>;
            updatePermissions<TData_2 extends TDocumentGet>(documentId: string, permissions: string[] | undefined): Promise<TDocumentGet>;
            updatePermissions<TData_3 extends TDocumentGet>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<TDocumentGet>;
            deleteDocument(filters: string[]): Promise<string>;
            deleteDocument(document: TDocumentGet): Promise<string>;
            deleteDocument(documentId: string): Promise<string>;
            deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
            deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
            getDocument(documentId: string): Promise<TDocumentGet | null>;
            getDocument(queries: string[]): Promise<TDocumentGet | null>;
            listDocuments<TData_4 extends TDocumentGet>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                total: number;
                documents: TDocumentGet[];
            }>;
        };
        Bucket: new (bucketId: string) => {
            bucketId: string;
            getFile(fileId: string): Promise<Models.File>;
            getParamsFromURL(URL: string): {
                fileId: string | undefined;
                bucketId: string | undefined;
            };
            createFile(base64: string, permissions?: string[] | undefined, filename?: string | undefined, type?: string | undefined, fileId?: string | undefined): Promise<Models.File>;
            deleteFile(file: string | Models.File): Promise<{}>;
            listFiles(): Promise<Models.FileList>;
            updateFile(id: string, name: string, permissions: string[] | undefined): Promise<Models.File>;
            updateFile(file: Models.File, name: string, permissions: string[] | undefined): Promise<Models.File>;
            getFilePreview(file: string | Models.File): URL;
            getFileDownload(file: string | Models.File): URL;
            getFileView(file: string | Models.File): URL;
            getFileURL(fileId: string): URL;
            getIdFromURL(URL: string): string | undefined;
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
            createSession(callbackFetch: () => Promise<globalThis.Response>): Promise<{
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
            } | undefined): {
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
            get<Preferences_9 extends Models.Preferences>(): Promise<Models.User<Preferences_9>>;
            create<Preferences_1_1 extends Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<Models.User<Preferences_1_1>>;
            updateEmail<Preferences_2_1 extends Models.Preferences>(email: string, password: string): Promise<Models.User<Preferences_2_1>>;
            listIdentities(queries?: string | undefined): Promise<Models.IdentityList>;
            deleteIdentity(identityId: string): Promise<{}>;
            createJWT(): Promise<Models.Jwt>;
            listLogs(queries?: string[] | undefined): Promise<Models.LogList>;
            updateName<Preferences_3_1 extends Models.Preferences>(name: string): Promise<Models.User<Preferences_3_1>>;
            updatePassword<Preferences_4_1 extends Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<Models.User<Preferences_4_1>>;
            updatePhone<Preferences_5_1 extends Models.Preferences>(phone: string, password: string): Promise<Models.User<Preferences_5_1>>;
            getPrefs<Preferences_6_1 extends Models.Preferences>(): Promise<Preferences_6_1>;
            updatePrefs<Preferences_7_1 extends Models.Preferences>(prefs: Partial<Preferences_7_1>): Promise<Models.User<Preferences_7_1>>;
            createRecovery(email: string, url: string): Promise<Models.Token>;
            updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<Models.Token>;
            listSessions(): Promise<Models.SessionList>;
            deleteSessions(): Promise<{}>;
            createAnonymousSession(): Promise<Models.Session>;
            createEmailSession(email: string, password: string): Promise<Models.Session>;
            createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<Models.Token>;
            updateMagicURLSession(userId: string, secret: string): Promise<Models.Session>;
            createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
            createPhoneSession(userId: string, phone: string): Promise<Models.Token>;
            updatePhoneSession(userId: string, secret: string): Promise<Models.Session>;
            getSession(sessionId: string): Promise<Models.Session>;
            updateSession(sessionId: string): Promise<Models.Session>;
            deleteSession(sessionId: string): Promise<{}>;
            updateStatus<Preferences_8_1 extends Models.Preferences>(): Promise<Models.User<Preferences_8_1>>;
            createVerification(url: string): Promise<Models.Token>;
            updateVerification(userId: string, secret: string): Promise<Models.Token>;
            createPhoneVerification(): Promise<Models.Token>;
            updatePhoneVerification(userId: string, secret: string): Promise<Models.Token>;
            client: import("appwrite/types/client").Client;
        };
        teams: import("appwrite").Teams;
        functions: import("appwrite").Functions;
        locale: import("@app/appwrite-ssr-graphql/dist/types/locale/locale").default;
        avatars: import("appwrite").Avatars;
        graphql: import("appwrite").Graphql;
        databases: import("appwrite").Databases;
        client: import("appwrite/types/client").Client;
        collections: {
            userInfo: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").UserInfoGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").UserInfoGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").UserInfoDocumentCreate, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").UserInfoGraphqlDocument>;
                createDocument(data: import("@app/ts-types").UserInfoDocumentCreate, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").UserInfoGraphqlDocument>;
                updateDocument<TData_5 extends import("@app/ts-types").UserInfoGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").UserInfoDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").UserInfoGraphqlDocument>;
                updateDocument<TData_1_1 extends import("@app/ts-types").UserInfoGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").UserInfoDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").UserInfoGraphqlDocument>;
                updatePermissions<TData_2_1 extends import("@app/ts-types").UserInfoGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").UserInfoGraphqlDocument>;
                updatePermissions<TData_3_1 extends import("@app/ts-types").UserInfoGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").UserInfoGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").UserInfoGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").UserInfoGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").UserInfoGraphqlDocument | null>;
                listDocuments<TData_4_1 extends import("@app/ts-types").UserInfoGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").UserInfoGraphqlDocument[];
                }>;
            };
            experience: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").ExperienceGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").ExperienceGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").ExperienceDocumentCreate, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").ExperienceGraphqlDocument>;
                createDocument(data: import("@app/ts-types").ExperienceDocumentCreate, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").ExperienceGraphqlDocument>;
                updateDocument<TData_6 extends import("@app/ts-types").ExperienceGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").ExperienceDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").ExperienceGraphqlDocument>;
                updateDocument<TData_1_2 extends import("@app/ts-types").ExperienceGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").ExperienceDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").ExperienceGraphqlDocument>;
                updatePermissions<TData_2_2 extends import("@app/ts-types").ExperienceGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").ExperienceGraphqlDocument>;
                updatePermissions<TData_3_2 extends import("@app/ts-types").ExperienceGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").ExperienceGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").ExperienceGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").ExperienceGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").ExperienceGraphqlDocument | null>;
                listDocuments<TData_4_2 extends import("@app/ts-types").ExperienceGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").ExperienceGraphqlDocument[];
                }>;
            };
            monument: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").MonumentGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").MonumentGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").MonumentDocumentCreate, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").MonumentGraphqlDocument>;
                createDocument(data: import("@app/ts-types").MonumentDocumentCreate, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").MonumentGraphqlDocument>;
                updateDocument<TData_7 extends import("@app/ts-types").MonumentGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").MonumentDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").MonumentGraphqlDocument>;
                updateDocument<TData_1_3 extends import("@app/ts-types").MonumentGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").MonumentDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").MonumentGraphqlDocument>;
                updatePermissions<TData_2_3 extends import("@app/ts-types").MonumentGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").MonumentGraphqlDocument>;
                updatePermissions<TData_3_3 extends import("@app/ts-types").MonumentGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").MonumentGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").MonumentGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").MonumentGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").MonumentGraphqlDocument | null>;
                listDocuments<TData_4_3 extends import("@app/ts-types").MonumentGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").MonumentGraphqlDocument[];
                }>;
            };
            token: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").TokenGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").TokenGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").Token, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").TokenGraphqlDocument>;
                createDocument(data: import("@app/ts-types").Token, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").TokenGraphqlDocument>;
                updateDocument<TData_8 extends import("@app/ts-types").TokenGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").Token> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").TokenGraphqlDocument>;
                updateDocument<TData_1_4 extends import("@app/ts-types").TokenGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").Token> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").TokenGraphqlDocument>;
                updatePermissions<TData_2_4 extends import("@app/ts-types").TokenGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").TokenGraphqlDocument>;
                updatePermissions<TData_3_4 extends import("@app/ts-types").TokenGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").TokenGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").TokenGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").TokenGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").TokenGraphqlDocument | null>;
                listDocuments<TData_4_4 extends import("@app/ts-types").TokenGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").TokenGraphqlDocument[];
                }>;
            };
            placeDetail: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").PlaceDetailGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").PlaceDetailGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").PlaceDetail, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").PlaceDetailGraphqlDocument>;
                createDocument(data: import("@app/ts-types").PlaceDetail, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").PlaceDetailGraphqlDocument>;
                updateDocument<TData_9 extends import("@app/ts-types").PlaceDetailGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").PlaceDetail> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").PlaceDetailGraphqlDocument>;
                updateDocument<TData_1_5 extends import("@app/ts-types").PlaceDetailGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").PlaceDetail> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").PlaceDetailGraphqlDocument>;
                updatePermissions<TData_2_5 extends import("@app/ts-types").PlaceDetailGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").PlaceDetailGraphqlDocument>;
                updatePermissions<TData_3_5 extends import("@app/ts-types").PlaceDetailGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").PlaceDetailGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").PlaceDetailGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").PlaceDetailGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").PlaceDetailGraphqlDocument | null>;
                listDocuments<TData_4_5 extends import("@app/ts-types").PlaceDetailGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").PlaceDetailGraphqlDocument[];
                }>;
            };
            monumentLike: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").MonumentLikeGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").MonumentLikeGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").MonumentLike, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").MonumentLikeGraphqlDocument>;
                createDocument(data: import("@app/ts-types").MonumentLike, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").MonumentLikeGraphqlDocument>;
                updateDocument<TData_10 extends import("@app/ts-types").MonumentLikeGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").MonumentLike> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").MonumentLikeGraphqlDocument>;
                updateDocument<TData_1_6 extends import("@app/ts-types").MonumentLikeGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").MonumentLike> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").MonumentLikeGraphqlDocument>;
                updatePermissions<TData_2_6 extends import("@app/ts-types").MonumentLikeGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").MonumentLikeGraphqlDocument>;
                updatePermissions<TData_3_6 extends import("@app/ts-types").MonumentLikeGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").MonumentLikeGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").MonumentLikeGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").MonumentLikeGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").MonumentLikeGraphqlDocument | null>;
                listDocuments<TData_4_6 extends import("@app/ts-types").MonumentLikeGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").MonumentLikeGraphqlDocument[];
                }>;
            };
            experienceLike: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").ExperienceLikeGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").ExperienceLikeGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").ExperienceLike, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").ExperienceLikeGraphqlDocument>;
                createDocument(data: import("@app/ts-types").ExperienceLike, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").ExperienceLikeGraphqlDocument>;
                updateDocument<TData_11 extends import("@app/ts-types").ExperienceLikeGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").ExperienceLike> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").ExperienceLikeGraphqlDocument>;
                updateDocument<TData_1_7 extends import("@app/ts-types").ExperienceLikeGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").ExperienceLike> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").ExperienceLikeGraphqlDocument>;
                updatePermissions<TData_2_7 extends import("@app/ts-types").ExperienceLikeGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").ExperienceLikeGraphqlDocument>;
                updatePermissions<TData_3_7 extends import("@app/ts-types").ExperienceLikeGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").ExperienceLikeGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").ExperienceLikeGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").ExperienceLikeGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").ExperienceLikeGraphqlDocument | null>;
                listDocuments<TData_4_7 extends import("@app/ts-types").ExperienceLikeGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").ExperienceLikeGraphqlDocument[];
                }>;
            };
            answerTypeText: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").TextTypeAnswerGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").TextTypeAnswerGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").TextTypeAnswer, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").TextTypeAnswerGraphqlDocument>;
                createDocument(data: import("@app/ts-types").TextTypeAnswer, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").TextTypeAnswerGraphqlDocument>;
                updateDocument<TData_12 extends import("@app/ts-types").TextTypeAnswerGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").TextTypeAnswer> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").TextTypeAnswerGraphqlDocument>;
                updateDocument<TData_1_8 extends import("@app/ts-types").TextTypeAnswerGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").TextTypeAnswer> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").TextTypeAnswerGraphqlDocument>;
                updatePermissions<TData_2_8 extends import("@app/ts-types").TextTypeAnswerGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").TextTypeAnswerGraphqlDocument>;
                updatePermissions<TData_3_8 extends import("@app/ts-types").TextTypeAnswerGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").TextTypeAnswerGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").TextTypeAnswerGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").TextTypeAnswerGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").TextTypeAnswerGraphqlDocument | null>;
                listDocuments<TData_4_8 extends import("@app/ts-types").TextTypeAnswerGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").TextTypeAnswerGraphqlDocument[];
                }>;
            };
            answerTypeNumber: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").NumberTypeAnswerGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").NumberTypeAnswerGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").NumberTypeAnswer, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").NumberTypeAnswerGraphqlDocument>;
                createDocument(data: import("@app/ts-types").NumberTypeAnswer, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").NumberTypeAnswerGraphqlDocument>;
                updateDocument<TData_13 extends import("@app/ts-types").NumberTypeAnswerGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").NumberTypeAnswer> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").NumberTypeAnswerGraphqlDocument>;
                updateDocument<TData_1_9 extends import("@app/ts-types").NumberTypeAnswerGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").NumberTypeAnswer> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").NumberTypeAnswerGraphqlDocument>;
                updatePermissions<TData_2_9 extends import("@app/ts-types").NumberTypeAnswerGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").NumberTypeAnswerGraphqlDocument>;
                updatePermissions<TData_3_9 extends import("@app/ts-types").NumberTypeAnswerGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").NumberTypeAnswerGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").NumberTypeAnswerGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").NumberTypeAnswerGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").NumberTypeAnswerGraphqlDocument | null>;
                listDocuments<TData_4_9 extends import("@app/ts-types").NumberTypeAnswerGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").NumberTypeAnswerGraphqlDocument[];
                }>;
            };
            answerTypeRadio: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").RadioTypeAnswerGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").RadioTypeAnswerGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").RadioTypeAnswer, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").RadioTypeAnswerGraphqlDocument>;
                createDocument(data: import("@app/ts-types").RadioTypeAnswer, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").RadioTypeAnswerGraphqlDocument>;
                updateDocument<TData_14 extends import("@app/ts-types").RadioTypeAnswerGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").RadioTypeAnswer> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").RadioTypeAnswerGraphqlDocument>;
                updateDocument<TData_1_10 extends import("@app/ts-types").RadioTypeAnswerGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").RadioTypeAnswer> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").RadioTypeAnswerGraphqlDocument>;
                updatePermissions<TData_2_10 extends import("@app/ts-types").RadioTypeAnswerGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").RadioTypeAnswerGraphqlDocument>;
                updatePermissions<TData_3_10 extends import("@app/ts-types").RadioTypeAnswerGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").RadioTypeAnswerGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").RadioTypeAnswerGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").RadioTypeAnswerGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").RadioTypeAnswerGraphqlDocument | null>;
                listDocuments<TData_4_10 extends import("@app/ts-types").RadioTypeAnswerGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").RadioTypeAnswerGraphqlDocument[];
                }>;
            };
            question: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").QuestionGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").QuestionGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").QuestionDocumentCreate, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").QuestionGraphqlDocument>;
                createDocument(data: import("@app/ts-types").QuestionDocumentCreate, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").QuestionGraphqlDocument>;
                updateDocument<TData_15 extends import("@app/ts-types").QuestionGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").QuestionDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").QuestionGraphqlDocument>;
                updateDocument<TData_1_11 extends import("@app/ts-types").QuestionGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").QuestionDocumentCreate> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").QuestionGraphqlDocument>;
                updatePermissions<TData_2_11 extends import("@app/ts-types").QuestionGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").QuestionGraphqlDocument>;
                updatePermissions<TData_3_11 extends import("@app/ts-types").QuestionGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").QuestionGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").QuestionGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").QuestionGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").QuestionGraphqlDocument | null>;
                listDocuments<TData_4_11 extends import("@app/ts-types").QuestionGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").QuestionGraphqlDocument[];
                }>;
            };
            usersAnswer: {
                atg: (...documents: Models.Document[]) => import("@app/ts-types").UsersAnswerGraphqlDocument[];
                atgDocumentList: (documentList: Models.DocumentList<Models.Document>) => {
                    total: number;
                    documents: import("@app/ts-types").UsersAnswerGraphqlDocument[];
                };
                databaseId: string;
                collectionId: string;
                createDocument(data: import("@app/ts-types").UsersAnswer, permissions?: Models.User<{}>[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").UsersAnswerGraphqlDocument>;
                createDocument(data: import("@app/ts-types").UsersAnswer, permissions?: string[] | undefined, id?: string | undefined): Promise<import("@app/ts-types").UsersAnswerGraphqlDocument>;
                updateDocument<TData_16 extends import("@app/ts-types").UsersAnswerGraphqlDocument>(documentId: string, data: {} | Partial<import("@app/ts-types").UsersAnswer> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").UsersAnswerGraphqlDocument>;
                updateDocument<TData_1_12 extends import("@app/ts-types").UsersAnswerGraphqlDocument>(document: Types.DocumentSkeleton, data: {} | Partial<import("@app/ts-types").UsersAnswer> | undefined, permissions?: string[] | undefined): Promise<import("@app/ts-types").UsersAnswerGraphqlDocument>;
                updatePermissions<TData_2_12 extends import("@app/ts-types").UsersAnswerGraphqlDocument>(documentId: string, permissions: string[] | undefined): Promise<import("@app/ts-types").UsersAnswerGraphqlDocument>;
                updatePermissions<TData_3_12 extends import("@app/ts-types").UsersAnswerGraphqlDocument>(document: Types.DocumentSkeleton, permissions: string[] | undefined): Promise<import("@app/ts-types").UsersAnswerGraphqlDocument>;
                deleteDocument(filters: string[]): Promise<string>;
                deleteDocument(document: import("@app/ts-types").UsersAnswerGraphqlDocument): Promise<string>;
                deleteDocument(documentId: string): Promise<string>;
                deleteDocuments(filters?: string[] | undefined): Promise<string[]>;
                deleteAllDocuments(filters?: string[] | undefined): Promise<string[]>;
                getDocument(documentId: string): Promise<import("@app/ts-types").UsersAnswerGraphqlDocument | null>;
                getDocument(queries: string[]): Promise<import("@app/ts-types").UsersAnswerGraphqlDocument | null>;
                listDocuments<TData_4_12 extends import("@app/ts-types").UsersAnswerGraphqlDocument>(filters?: string[] | undefined, offset?: number | undefined, limit?: number | undefined, orderType?: "ASC" | "DESC" | null | undefined): Promise<{
                    total: number;
                    documents: import("@app/ts-types").UsersAnswerGraphqlDocument[];
                }>;
            };
        };
        Queries: {
            userInfo: {
                equal: <TKey extends keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey, value: import("@app/ts-types").UserInfoDocument[TKey] | import("@app/ts-types").UserInfoDocument[TKey][]) => string;
                between: (attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1 extends keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UserInfoDocument[TKey_1]) => string;
                greaterThan: <TKey_2 extends keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UserInfoDocument[TKey_2]) => string;
                greaterThanEqual: <TKey_3 extends keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UserInfoDocument[TKey_3]) => string;
                isNotNull: (attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4 extends keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UserInfoDocument[TKey_4]) => string;
                lessThanEqual: <TKey_5 extends keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UserInfoDocument[TKey_5]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6 extends keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UserInfoDocument[TKey_6]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: (keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7 extends keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UserInfo | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UserInfoDocument[TKey_7]) => string;
            };
            experience: {
                equal: <TKey_8 extends "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_8, value: import("@app/ts-types").ExperienceDocument[TKey_8] | import("@app/ts-types").ExperienceDocument[TKey_8][]) => string;
                between: (attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_1 extends "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceDocument[TKey_1_1]) => string;
                greaterThan: <TKey_2_1 extends "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceDocument[TKey_2_1]) => string;
                greaterThanEqual: <TKey_3_1 extends "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceDocument[TKey_3_1]) => string;
                isNotNull: (attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_1 extends "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceDocument[TKey_4_1]) => string;
                lessThanEqual: <TKey_5_1 extends "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceDocument[TKey_5_1]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_1 extends "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceDocument[TKey_6_1]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: ("userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_1 extends "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | "pictureUrl" | "connectedMonumentId" | keyof import("@app/ts-types").LocationForDocument | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceDocument[TKey_7_1]) => string;
            };
            monument: {
                equal: <TKey_9 extends "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_9, value: import("@app/ts-types").MonumentDocument[TKey_9] | import("@app/ts-types").MonumentDocument[TKey_9][]) => string;
                between: (attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_2 extends "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentDocument[TKey_1_2]) => string;
                greaterThan: <TKey_2_2 extends "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentDocument[TKey_2_2]) => string;
                greaterThanEqual: <TKey_3_2 extends "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentDocument[TKey_3_2]) => string;
                isNotNull: (attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_2 extends "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentDocument[TKey_4_2]) => string;
                lessThanEqual: <TKey_5_2 extends "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentDocument[TKey_5_2]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_2 extends "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentDocument[TKey_6_2]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: ("userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_2 extends "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "userId" | keyof import("@app/ts-types").LocationForDocument | "about" | "name" | "pictureURL" | "placeDetailId" | "topics" | "transports" | "questionId" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentDocument[TKey_7_2]) => string;
            };
            placeDetail: {
                equal: <TKey_10 extends "name" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_10, value: import("@app/ts-types").PlaceDetailDocument[TKey_10] | import("@app/ts-types").PlaceDetailDocument[TKey_10][]) => string;
                between: (attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_3 extends "name" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").PlaceDetailDocument[TKey_1_3]) => string;
                greaterThan: <TKey_2_3 extends "name" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").PlaceDetailDocument[TKey_2_3]) => string;
                greaterThanEqual: <TKey_3_3 extends "name" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").PlaceDetailDocument[TKey_3_3]) => string;
                isNotNull: (attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_3 extends "name" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").PlaceDetailDocument[TKey_4_3]) => string;
                lessThanEqual: <TKey_5_3 extends "name" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").PlaceDetailDocument[TKey_5_3]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_3 extends "name" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").PlaceDetailDocument[TKey_6_3]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: ("name" | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_3 extends "name" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "name" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").PlaceDetailDocument[TKey_7_3]) => string;
            };
            token: {
                equal: <TKey_11 extends keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_11, value: import("@app/ts-types").TokenDocument[TKey_11] | import("@app/ts-types").TokenDocument[TKey_11][]) => string;
                between: (attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_4 extends keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TokenDocument[TKey_1_4]) => string;
                greaterThan: <TKey_2_4 extends keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TokenDocument[TKey_2_4]) => string;
                greaterThanEqual: <TKey_3_4 extends keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TokenDocument[TKey_3_4]) => string;
                isNotNull: (attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_4 extends keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TokenDocument[TKey_4_4]) => string;
                lessThanEqual: <TKey_5_4 extends keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TokenDocument[TKey_5_4]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_4 extends keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TokenDocument[TKey_6_4]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: (keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_4 extends keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").Token | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TokenDocument[TKey_7_4]) => string;
            };
            monumentLike: {
                equal: <TKey_12 extends keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_12, value: import("@app/ts-types").MonumentLikeDocument[TKey_12] | import("@app/ts-types").MonumentLikeDocument[TKey_12][]) => string;
                between: (attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_5 extends keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentLikeDocument[TKey_1_5]) => string;
                greaterThan: <TKey_2_5 extends keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentLikeDocument[TKey_2_5]) => string;
                greaterThanEqual: <TKey_3_5 extends keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentLikeDocument[TKey_3_5]) => string;
                isNotNull: (attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_5 extends keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentLikeDocument[TKey_4_5]) => string;
                lessThanEqual: <TKey_5_5 extends keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentLikeDocument[TKey_5_5]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_5 extends keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentLikeDocument[TKey_6_5]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: (keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_5 extends keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").MonumentLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").MonumentLikeDocument[TKey_7_5]) => string;
            };
            experienceLike: {
                equal: <TKey_13 extends keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_13, value: import("@app/ts-types").ExperienceLikeDocument[TKey_13] | import("@app/ts-types").ExperienceLikeDocument[TKey_13][]) => string;
                between: (attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_6 extends keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceLikeDocument[TKey_1_6]) => string;
                greaterThan: <TKey_2_6 extends keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceLikeDocument[TKey_2_6]) => string;
                greaterThanEqual: <TKey_3_6 extends keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceLikeDocument[TKey_3_6]) => string;
                isNotNull: (attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_6 extends keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceLikeDocument[TKey_4_6]) => string;
                lessThanEqual: <TKey_5_6 extends keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceLikeDocument[TKey_5_6]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_6 extends keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceLikeDocument[TKey_6_6]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: (keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_6 extends keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").ExperienceLike | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").ExperienceLikeDocument[TKey_7_6]) => string;
            };
            answerTypeNumber: {
                equal: <TKey_14 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_14, value: import("@app/ts-types").NumberTypeAnswerDocument[TKey_14] | import("@app/ts-types").NumberTypeAnswerDocument[TKey_14][]) => string;
                between: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_7 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").NumberTypeAnswerDocument[TKey_1_7]) => string;
                greaterThan: <TKey_2_7 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").NumberTypeAnswerDocument[TKey_2_7]) => string;
                greaterThanEqual: <TKey_3_7 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").NumberTypeAnswerDocument[TKey_3_7]) => string;
                isNotNull: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_7 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").NumberTypeAnswerDocument[TKey_4_7]) => string;
                lessThanEqual: <TKey_5_7 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").NumberTypeAnswerDocument[TKey_5_7]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_7 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").NumberTypeAnswerDocument[TKey_6_7]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: ("correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_7 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").NumberTypeAnswerDocument[TKey_7_7]) => string;
            };
            answerTypeText: {
                equal: <TKey_15 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_15, value: import("@app/ts-types").TextTypeAnswerDocument[TKey_15] | import("@app/ts-types").TextTypeAnswerDocument[TKey_15][]) => string;
                between: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_8 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TextTypeAnswerDocument[TKey_1_8]) => string;
                greaterThan: <TKey_2_8 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TextTypeAnswerDocument[TKey_2_8]) => string;
                greaterThanEqual: <TKey_3_8 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TextTypeAnswerDocument[TKey_3_8]) => string;
                isNotNull: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_8 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TextTypeAnswerDocument[TKey_4_8]) => string;
                lessThanEqual: <TKey_5_8 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TextTypeAnswerDocument[TKey_5_8]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_8 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TextTypeAnswerDocument[TKey_6_8]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: ("correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_8 extends "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton>(attribute: "correctAnswer" | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").TextTypeAnswerDocument[TKey_7_8]) => string;
            };
            answerTypeRadio: {
                equal: <TKey_16 extends keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_16, value: import("@app/ts-types").RadioTypeAnswerDocument[TKey_16] | import("@app/ts-types").RadioTypeAnswerDocument[TKey_16][]) => string;
                between: (attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_9 extends keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").RadioTypeAnswerDocument[TKey_1_9]) => string;
                greaterThan: <TKey_2_9 extends keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").RadioTypeAnswerDocument[TKey_2_9]) => string;
                greaterThanEqual: <TKey_3_9 extends keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").RadioTypeAnswerDocument[TKey_3_9]) => string;
                isNotNull: (attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_9 extends keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").RadioTypeAnswerDocument[TKey_4_9]) => string;
                lessThanEqual: <TKey_5_9 extends keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").RadioTypeAnswerDocument[TKey_5_9]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_9 extends keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").RadioTypeAnswerDocument[TKey_6_9]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: (keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_9 extends keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").RadioTypeAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").RadioTypeAnswerDocument[TKey_7_9]) => string;
            };
            question: {
                equal: <TKey_17 extends keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_17, value: import("@app/ts-types").QuestionDocument[TKey_17] | import("@app/ts-types").QuestionDocument[TKey_17][]) => string;
                between: (attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_10 extends keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").QuestionDocument[TKey_1_10]) => string;
                greaterThan: <TKey_2_10 extends keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").QuestionDocument[TKey_2_10]) => string;
                greaterThanEqual: <TKey_3_10 extends keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").QuestionDocument[TKey_3_10]) => string;
                isNotNull: (attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_10 extends keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").QuestionDocument[TKey_4_10]) => string;
                lessThanEqual: <TKey_5_10 extends keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").QuestionDocument[TKey_5_10]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_10 extends keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").QuestionDocument[TKey_6_10]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: (keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_10 extends keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").QuestionDocumentCreate | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").QuestionDocument[TKey_7_10]) => string;
            };
            usersAnswer: {
                equal: <TKey_18 extends keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: TKey_18, value: import("@app/ts-types").UsersAnswerDocument[TKey_18] | import("@app/ts-types").UsersAnswerDocument[TKey_18][]) => string;
                between: (attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton, start: number, end: number) => string;
                cursorAfter: (documentId: string) => string;
                cursorBefore: (documentId: string) => string;
                endsWith: <TKey_1_11 extends keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UsersAnswerDocument[TKey_1_11]) => string;
                greaterThan: <TKey_2_11 extends keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UsersAnswerDocument[TKey_2_11]) => string;
                greaterThanEqual: <TKey_3_11 extends keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UsersAnswerDocument[TKey_3_11]) => string;
                isNotNull: (attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton) => string;
                isNull: (attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton) => string;
                lessThan: <TKey_4_11 extends keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UsersAnswerDocument[TKey_4_11]) => string;
                lessThanEqual: <TKey_5_11 extends keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UsersAnswerDocument[TKey_5_11]) => string;
                limit: (limit: number) => string;
                notEqual: <TKey_6_11 extends keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UsersAnswerDocument[TKey_6_11]) => string;
                offset: (offset: number) => string;
                orderAsc: (attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton) => string;
                orderDesc: (attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton) => string;
                search: (attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: string) => string;
                select: (attributes: (keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton)[]) => string;
                startsWith: <TKey_7_11 extends keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton>(attribute: keyof import("@app/ts-types").UsersAnswer | keyof import("@app/ts-types").DocumentSkeleton, value: import("@app/ts-types").UsersAnswerDocument[TKey_7_11]) => string;
            };
        };
    };
}>;
export type Context = NonNullable<Awaited<ReturnType<typeof context>>>;
//# sourceMappingURL=context.d.ts.map