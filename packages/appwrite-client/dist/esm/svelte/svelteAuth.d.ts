/// <reference types="svelte" />
import { Account } from 'appwrite';
import type { Models } from 'appwrite';
import type { Writable } from 'svelte/store';
import { Preferences } from '@app/ts-types';
declare const _default: (account: Account) => {
    new (): {
        userStore: Writable<Models.User<Models.Preferences> | null>;
        subscribe: (this: void, run: import("svelte/store").Subscriber<Models.User<Models.Preferences> | null>, invalidate?: import("svelte/store").Invalidator<Models.User<Models.Preferences> | null> | undefined) => import("svelte/store").Unsubscriber;
        isLoadingStore: Writable<boolean>;
        isLoading: {
            subscribe: (this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: import("svelte/store").Invalidator<boolean> | undefined) => import("svelte/store").Unsubscriber;
        };
        userId: string;
        createEmailSession(email: string, password: string): Promise<Models.Session>;
        createPhoneSession(phone: string, userId?: string): Promise<Models.Token>;
        updatePhoneSession(secret: string, userId?: string): Promise<Models.Session>;
        deleteSession(sessionId: string): Promise<{}>;
        deleteSessions(): Promise<{}>;
        createAccount(email: string, password: string, name: string): Promise<Models.User<Models.Preferences>>;
        addPreferences(prefs: Partial<Preferences>): Promise<Models.User<{
            termsAccepted: boolean;
            mapRange: number;
        }>>;
        removePreferences(...prefsNames: string[]): Promise<Models.User<Preferences>>;
        __get(): Promise<Models.User<Models.Preferences> | null>;
        getUser(): Promise<Models.User<Models.Preferences> | null>;
        get<Preferences_1 extends Models.Preferences>(): Promise<Models.User<Preferences_1>>;
        create<Preferences_2 extends Models.Preferences>(userId: string, email: string, password: string, name?: string | undefined): Promise<Models.User<Preferences_2>>;
        updateEmail<Preferences_3 extends Models.Preferences>(email: string, password: string): Promise<Models.User<Preferences_3>>;
        listIdentities(queries?: string | undefined): Promise<Models.IdentityList>;
        deleteIdentity(identityId: string): Promise<{}>;
        createJWT(): Promise<Models.Jwt>;
        listLogs(queries?: string[] | undefined): Promise<Models.LogList>;
        updateName<Preferences_4 extends Models.Preferences>(name: string): Promise<Models.User<Preferences_4>>;
        updatePassword<Preferences_5 extends Models.Preferences>(password: string, oldPassword?: string | undefined): Promise<Models.User<Preferences_5>>;
        updatePhone<Preferences_6 extends Models.Preferences>(phone: string, password: string): Promise<Models.User<Preferences_6>>;
        getPrefs<Preferences_7 extends Models.Preferences>(): Promise<Preferences_7>;
        updatePrefs<Preferences_8 extends Models.Preferences>(prefs: Partial<Preferences_8>): Promise<Models.User<Preferences_8>>;
        createRecovery(email: string, url: string): Promise<Models.Token>;
        updateRecovery(userId: string, secret: string, password: string, passwordAgain: string): Promise<Models.Token>;
        listSessions(): Promise<Models.SessionList>;
        createAnonymousSession(): Promise<Models.Session>;
        createMagicURLSession(userId: string, email: string, url?: string | undefined): Promise<Models.Token>;
        updateMagicURLSession(userId: string, secret: string): Promise<Models.Session>;
        createOAuth2Session(provider: string, success?: string | undefined, failure?: string | undefined, scopes?: string[] | undefined): void | URL;
        getSession(sessionId: string): Promise<Models.Session>;
        updateSession(sessionId: string): Promise<Models.Session>;
        updateStatus<Preferences_9 extends Models.Preferences>(): Promise<Models.User<Preferences_9>>;
        createVerification(url: string): Promise<Models.Token>;
        updateVerification(userId: string, secret: string): Promise<Models.Token>;
        createPhoneVerification(): Promise<Models.Token>;
        updatePhoneVerification(userId: string, secret: string): Promise<Models.Token>;
        client: import("appwrite/types/client").Client;
    };
    CHUNK_SIZE: number;
    flatten(data: import("appwrite/types/client").Payload, prefix?: string | undefined): import("appwrite/types/client").Payload;
};
export default _default;
//# sourceMappingURL=svelteAuth.d.ts.map