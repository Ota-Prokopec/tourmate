/// <reference types="svelte" />
import { Client, Teams, Functions, Locale, Avatars, Graphql, Account, Role, Permission, ID } from 'appwrite';
import { Query } from 'appwrite';
declare const _default: (client: Client) => {
    client: Client;
    teams: Teams;
    functions: Functions;
    locale: Locale;
    avatars: Avatars;
    graphql: Graphql;
    account: Account;
    database: (client: Client) => {
        new <TDocumentGet extends import("..").Types.Document<{}>, TDocumentCreate extends Record<string, import("..").Types.DatabaseValue>>(databaseId: string, collectionId: string): {
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
            getDocument(documentId: string): Promise<TDocumentGet | null>;
            getDocument(queries: string[]): Promise<TDocumentGet | null>;
            listDocuments<TData_4 extends TDocumentGet>(filters?: string[], offset?: number, limit?: number, orderType?: "ASC" | "DESC" | null): Promise<import("appwrite").Models.DocumentList<TData_4>>;
            subscribeDocument(documentId: string, callback: (data: import("appwrite").RealtimeResponseEvent<TDocumentGet>) => void): void;
            listenUpdate(documentId: string, callback: (data: TDocumentGet) => void): void;
        };
    };
    user: {
        userStore: import("svelte/store").Writable<import("appwrite").Models.User<import("appwrite").Models.Preferences> | null>;
        subscribe: (this: void, run: import("svelte/store").Subscriber<import("appwrite").Models.User<import("appwrite").Models.Preferences> | null>, invalidate?: import("svelte/store").Invalidator<import("appwrite").Models.User<import("appwrite").Models.Preferences> | null> | undefined) => import("svelte/store").Unsubscriber;
        isLoadingStore: import("svelte/store").Writable<boolean>;
        isLoading: {
            subscribe: (this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: import("svelte/store").Invalidator<boolean> | undefined) => import("svelte/store").Unsubscriber;
        };
        userId: string;
        createEmailSession(email: string, password: string): Promise<import("appwrite").Models.Session>;
        createPhoneSession(phone: string, userId?: string): Promise<import("appwrite").Models.Token>;
        updatePhoneSession(secret: string, userId?: string): Promise<import("appwrite").Models.Session>;
        deleteSession(sessionId: string): Promise<{}>;
        deleteSessions(): Promise<{}>;
        createAccount(email: string, password: string, name: string): Promise<import("appwrite").Models.User<import("appwrite").Models.Preferences>>;
        addPreferences(prefs: Partial<import("@app/ts-types").Preferences>): Promise<import("appwrite").Models.User<{
            termsAccepted: boolean;
            mapRange: number;
        }>>;
        removePreferences(...prefsNames: string[]): Promise<import("appwrite").Models.User<import("@app/ts-types").Preferences>>;
        __get(): Promise<import("appwrite").Models.User<import("appwrite").Models.Preferences> | null>;
        getUser(): Promise<import("appwrite").Models.User<import("appwrite").Models.Preferences> | null>;
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
        createAnonymousSession(): Promise<import("appwrite").Models.Session>;
        createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<import("appwrite").Models.Token>;
        updateMagicURLSession(userId: string, secret: string): Promise<import("appwrite").Models.Session>;
        createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
        getSession(sessionId: string): Promise<import("appwrite").Models.Session>;
        updateSession(sessionId: string): Promise<import("appwrite").Models.Session>;
        updateStatus<Preferences_8 extends import("appwrite").Models.Preferences>(): Promise<import("appwrite").Models.User<Preferences_8>>;
        createVerification(url: string): Promise<import("appwrite").Models.Token>;
        updateVerification(userId: string, secret: string): Promise<import("appwrite").Models.Token>;
        createPhoneVerification(): Promise<import("appwrite").Models.Token>;
        updatePhoneVerification(userId: string, secret: string): Promise<import("appwrite").Models.Token>;
        client: Client;
    };
    isLoading: {
        subscribe: (this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: import("svelte/store").Invalidator<boolean> | undefined) => import("svelte/store").Unsubscriber;
    };
    Collection: {
        new <TDocumentGet extends import("..").Types.Document<{}>, TDocumentCreate extends Record<string, import("..").Types.DatabaseValue>>(databaseId: string, collectionId: string): {
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
            getDocument(documentId: string): Promise<TDocumentGet | null>;
            getDocument(queries: string[]): Promise<TDocumentGet | null>;
            listDocuments<TData_4 extends TDocumentGet>(filters?: string[], offset?: number, limit?: number, orderType?: "ASC" | "DESC" | null): Promise<import("appwrite").Models.DocumentList<TData_4>>;
            subscribeDocument(documentId: string, callback: (data: import("appwrite").RealtimeResponseEvent<TDocumentGet>) => void): void;
            listenUpdate(documentId: string, callback: (data: TDocumentGet) => void): void;
        };
    };
    Query: typeof Query;
    Role: typeof Role;
    Permission: typeof Permission;
    ID: typeof ID;
};
export default _default;
//# sourceMappingURL=connection.d.ts.map