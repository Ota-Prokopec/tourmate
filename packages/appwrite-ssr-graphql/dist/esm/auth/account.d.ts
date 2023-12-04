import { Client } from 'appwrite';
import { Types } from '../types/Types';
export declare const getSessionFromCookie: (projectId: string, cookies: Types.Cookie[] | {}[]) => string | undefined;
declare const _default: (client: Client, hostname: string) => {
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
export default _default;
//# sourceMappingURL=account.d.ts.map