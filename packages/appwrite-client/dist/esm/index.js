import { Account, ID, Databases, Query, Teams, Functions, Locale, Avatars, Graphql, Role, Permission } from 'appwrite';
import { writable } from 'svelte/store';
import lodash from 'lodash';
import * as permissionslib from '@app/appwrite-permissions';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var createAuthDispatcher = (account) => {
    const client = account.client;
    return class Auth extends Account {
        constructor() {
            super(client);
            this.userStore = writable(null);
            this.subscribe = this.userStore.subscribe;
            this.isLoadingStore = writable(true);
            this.isLoading = { subscribe: this.isLoadingStore.subscribe };
            this.userId = Math.random().toString().substring(2, 7);
            try {
                if (window) {
                    this.__get().then(() => this.isLoadingStore.set(false));
                    client.subscribe('account', (response) => {
                        if (response.events.includes('users.*.update')) {
                            return this.__get();
                        }
                        if (response.events.includes('users.*.delete')) {
                            this.deleteSessions();
                            return this.userStore.set(null);
                        }
                    });
                }
            }
            catch (error) { }
        }
        createEmailSession(email, password) {
            return __awaiter(this, void 0, void 0, function* () {
                const session = yield account.createEmailSession(email, password);
                yield this.__get();
                return session;
            });
        }
        createPhoneSession(phone, userId = this.userId) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield account.createPhoneSession(userId, phone);
                return token;
            });
        }
        updatePhoneSession(secret, userId = this.userId) {
            return __awaiter(this, void 0, void 0, function* () {
                const session = yield account.updatePhoneSession(userId, secret);
                yield this.__get();
                return session;
            });
        }
        deleteSession(sessionId) {
            return __awaiter(this, void 0, void 0, function* () {
                const session = yield account.deleteSession(sessionId);
                this.userStore.set(null);
                return session;
            });
        }
        deleteSessions() {
            return __awaiter(this, void 0, void 0, function* () {
                const session = yield account.deleteSessions();
                this.userStore.set(null);
                return session;
            });
        }
        createAccount(email, password, name) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield account.create(ID.unique(), email, password, name);
            });
        }
        addPreferences(prefs) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentPrefs = yield account.getPrefs();
                return yield account.updatePrefs(Object.assign(Object.assign({}, currentPrefs), prefs));
            });
        }
        removePreferences(...prefsNames) {
            return __awaiter(this, void 0, void 0, function* () {
                const currentPrefs = yield account.getPrefs();
                return yield account.updatePrefs(lodash.omit(currentPrefs, prefsNames));
            });
        }
        __get() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield account.get();
                    this.userStore.set(user);
                    return user;
                }
                catch (e) {
                    this.userStore.set(null);
                    return null;
                }
            });
        }
        getUser() {
            return this.__get();
        }
    };
};

const isArrayString = (permissions) => {
    return permissions.every((permission) => typeof permission === 'string');
};
const convertObjectInfoArray = (data) => {
    return Object.values(data);
};
var database = (client) => {
    const databases = new Databases(client);
    return class Collection {
        constructor(databaseId, collectionId) {
            this.databaseId = databaseId;
            this.collectionId = collectionId;
            this.databaseId = databaseId;
            this.collectionId = collectionId;
        }
        createDocument(data, permissions = undefined, id = ID.unique()) {
            try {
                if ((permissions && isArrayString(permissions)) || !permissions) {
                    return databases.createDocument(this.databaseId, this.collectionId, id, 
                    //@ts-ignore
                    data, permissions);
                }
                else
                    return databases.createDocument(this.databaseId, this.collectionId, id, 
                    //@ts-ignore
                    data, permissionslib.owner(...permissions.map((user) => user.$id)));
            }
            catch (error) {
                console.log(`Error:${error} databaseId: ${this.databaseId} collectionId: ${this.collectionId}`);
                throw error;
            }
        }
        updateDocument(param, data, permissions = undefined) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!Array.isArray(permissions) && permissions)
                    permissions = convertObjectInfoArray(permissions);
                return databases.updateDocument(this.databaseId, this.collectionId, typeof param === 'string' ? param : param.$id, data !== null && data !== void 0 ? data : {}, permissions);
            });
        }
        updatePermissions(documentId, permissions = undefined) {
            if (!Array.isArray(permissions) && permissions)
                permissions = convertObjectInfoArray(permissions);
            return databases.updateDocument(this.databaseId, this.collectionId, typeof documentId === 'string' ? documentId : documentId.$id, {}, permissions);
        }
        deleteDocument(param) {
            return __awaiter(this, void 0, void 0, function* () {
                //	console.log(Array.isArray(param) && isArrayString(param))
                if (typeof param === 'string') {
                    return databases.deleteDocument(this.databaseId, this.collectionId, param);
                }
                else if (Array.isArray(param) && isArrayString(param)) {
                    const document = yield this.getDocument(param);
                    if (!document)
                        throw new Error('document that is requeste was not found, check permissions first');
                    return yield this.deleteDocument(document.$id);
                } //else if ((param as TDocumentGet) && !Array.isArray(param)) {
                return databases.deleteDocument(this.databaseId, this.collectionId, param.$id);
            });
        }
        //delete documents with node-appwrite
        deleteDocuments(filters) {
            return __awaiter(this, void 0, void 0, function* () {
                const { documents } = yield this.listDocuments(filters);
                if (documents.length === 0)
                    throw new TypeError('No document found to delete');
                return yield Promise.all(documents.map((document) => this.deleteDocument(document.$id)));
            });
        }
        getDocument(params) {
            return __awaiter(this, void 0, void 0, function* () {
                let data;
                if (typeof params === 'string') {
                    try {
                        data = yield databases.getDocument(this.databaseId, this.collectionId, params);
                    }
                    catch (error) {
                        data = null;
                    }
                }
                else {
                    const list = yield this.listDocuments(params);
                    if (list.total > 1)
                        throw new Error('Multiple documents found, use listDocuments instead or try to be more specific in your query');
                    data = list.documents[0] || null;
                }
                if (typeof (data === null || data === void 0 ? void 0 : data.$permissions) === 'object' && !Array.isArray(data === null || data === void 0 ? void 0 : data.$permissions))
                    data.$permissions = convertObjectInfoArray(data.$permissions);
                return data;
            });
        }
        //list documents with node-appwrite
        listDocuments(filters = [], offset = 0, limit = -1, orderType = null) {
            return __awaiter(this, void 0, void 0, function* () {
                if (Number.isInteger(offset) === false)
                    throw new TypeError('offset must be a non-negative integer');
                if (offset < 0)
                    throw new TypeError('limit must be a non-negative integer');
                if (Number.isInteger(limit) === false)
                    throw new TypeError('limit must be a non-negative integer or -1');
                if (limit < -1)
                    throw new TypeError('limit must be a non-negative integer or -1');
                if (filters.some((filter) => (filter.includes('[]') ? true : false))) {
                    throw new TypeError('filters must include least one item in Query');
                }
                const queries = [...filters];
                if (offset > 0)
                    queries.push(Query.offset(offset));
                if (limit !== -1)
                    queries.push(Query.limit(limit));
                if (orderType !== null)
                    queries.push(orderType === 'ASC' ? Query.orderAsc('') : Query.orderDesc(''));
                const data = yield databases.listDocuments(this.databaseId, this.collectionId, queries);
                data.documents = data.documents.map((document) => (Object.assign(Object.assign({}, document), { $pemissions: Array.isArray(document.$permissions)
                        ? document.$permissions
                        : convertObjectInfoArray(document.$permissions) })));
                return data;
            });
        }
        subscribeDocument(documentId, callback) {
            client.subscribe(`databases.${this.databaseId}.collections.${this.collectionId}.documents.${documentId}`, (response) => {
                callback(response);
            });
        }
        listenUpdate(documentId, callback) {
            this.subscribeDocument(documentId, (response) => {
                if (response.events.includes(`databases.${this.databaseId}.collections.${this.collectionId}.documents.${documentId}.update`)) {
                    callback(response.payload);
                }
            });
        }
    };
};

var connection = (client) => {
    const teams = new Teams(client);
    const functions = new Functions(client);
    const locale = new Locale(client);
    const avatars = new Avatars(client);
    const graphql = new Graphql(client);
    const account = new Account(client);
    const Auth = createAuthDispatcher(account);
    const Collection = database(client);
    const user = new Auth();
    const isLoading = user.isLoading;
    return {
        client,
        teams,
        functions,
        locale,
        avatars,
        graphql,
        account,
        database,
        user,
        isLoading,
        Collection,
        Query,
        Role,
        Permission,
        ID,
    };
};

const appwriteKeys = ['$permissions', '$id', '$collectionId', '$createdAt', '$databaseId', '$updatedAt'];

export { appwriteKeys, connection, connection as default };
//# sourceMappingURL=index.js.map
