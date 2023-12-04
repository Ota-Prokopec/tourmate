'use strict';

var appwrite = require('appwrite');
var nodeAppwrite = require('node-appwrite');
var setCookie = require('set-cookie-parser');
var zod = require('zod');
var permissionslib = require('@app/appwrite-permissions');
var lodash = require('lodash');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var appwrite__namespace = /*#__PURE__*/_interopNamespaceDefault(appwrite);
var setCookie__namespace = /*#__PURE__*/_interopNamespaceDefault(setCookie);
var permissionslib__namespace = /*#__PURE__*/_interopNamespaceDefault(permissionslib);
var lodash__namespace = /*#__PURE__*/_interopNamespaceDefault(lodash);

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

const userHasCookies = (cookies) => Object.entries(cookies).length !== 0;
const getSessionFromCookie = (projectId, cookies) => {
    if (!userHasCookies(cookies))
        throw new Error('No cookies provided');
    const sessionNames = [
        'a_session_' + projectId.toLowerCase(),
        'a_session_' + projectId.toLowerCase() + '_legacy',
    ];
    const appwriteCookies = cookies
        .filter((cookie) => sessionNames.includes(cookie.name))
        .sort((a, b) => a.name.length - b.name.length);
    const session = appwriteCookies[0]; // [0] is a_session_...... and [1] is a_session_........_legacy, because of sorting
    if (!session)
        throw new Error('No cookies provided');
    return session.value;
};
var account_ = (client, hostname) => {
    const sessionNames = [
        'a_session_' + client.config.project.toLowerCase(),
        'a_session_' + client.config.project.toLowerCase() + '_legacy',
    ];
    const SSRHostName = hostname === 'localhost' ? 'localhost' : `.${hostname}`;
    return class Auth extends appwrite.Account {
        constructor() {
            super(client);
        }
        loginViaEmail(email, password) {
            if (!client.config.endpoint || !client.config.project)
                throw new Error('Project or endpoint is not set');
            const promise = fetch(`${client.config.endpoint}/account/sessions/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-appwrite-project': client.config.project,
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            return this.createSession(() => promise);
        }
        createSession(callbackFetch) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield callbackFetch();
                    const json = yield response.json();
                    const { status } = zod.z.object({ status: zod.z.number() }).parse(response);
                    if (status === 429)
                        throw new Error('429');
                    else if (status >= 401)
                        throw new Error('400');
                    const cookiesStr = ((_a = response.headers.get('set-cookie')) !== null && _a !== void 0 ? _a : '')
                        .split(SSRHostName)
                        .join(SSRHostName);
                    const cookiesArray = setCookie__namespace.splitCookiesString(cookiesStr);
                    const cookiesParsed = cookiesArray.map((cookie) => setCookie__namespace.parseString(cookie));
                    const session = cookiesParsed[0];
                    const sessionLegacy = cookiesParsed[1];
                    if (!session)
                        throw new Error('session was not created/found');
                    return {
                        sessionToken: Object.assign(Object.assign({}, session), { name: sessionNames[0], domain: SSRHostName, path: '/' }),
                        sessionLegacyToken: Object.assign(Object.assign({}, sessionLegacy), { name: sessionNames[1], domain: SSRHostName, path: '/' }),
                    };
                }
                catch (error) {
                    throw error;
                }
            });
        }
        logOut() {
            return {
                sessionToken: {
                    value: '',
                    name: sessionNames[0],
                    domain: SSRHostName,
                    path: '/',
                },
                sessionLegacyToken: {
                    value: '',
                    name: sessionNames[1],
                    domain: SSRHostName,
                    path: '/',
                },
                sessionNames: { token: sessionNames[0], legacyToken: sessionNames[1] },
            };
        }
        oauth2Login(url, params = {
            domain: hostname,
            secure: true,
            path: '/',
            httpOnly: true,
        }) {
            // do this only on path: /auth/oauth2/success (strictly)
            const urlParams = new URLSearchParams(url.searchParams);
            const secret = urlParams.get('secret');
            if (!secret)
                throw new Error(`Invalid secret`);
            return {
                sessionToken: Object.assign({ name: sessionNames[0], value: secret }, params),
                sessionLegacyToken: Object.assign({ name: sessionNames[0], value: secret }, params),
            };
        }
    };
};

const appwriteKeys = [
    '$permissions',
    '$id',
    '$collectionId',
    '$createdAt',
    '$databaseId',
    '$updatedAt',
];
const appwriteGraphqlKeys = [
    '_permissions',
    '_id',
    '_collectionId',
    '_createdAt',
    '_databaseId',
    '_updatedAt',
];

const { omit } = lodash__namespace;
const transformAppwriteDocumentsIntoGraphqlDocuments = (...documents) => {
    return documents.map((document) => (Object.assign(Object.assign({}, omit(document, appwriteKeys)), { _id: document.$id, _updatedAt: document.$updatedAt, _createdAt: document.$createdAt, _collectionId: document.$collectionId, _permissions: document.$permissions, _databaseId: document.$databaseId })));
};

const transformAppwriteToGraphql = () => (...documents) => transformAppwriteDocumentsIntoGraphqlDocuments(...documents);
const transformAppwriteToGraphqlDocumentList = () => (documentList) => ({ total: documentList.total, documents: transformAppwriteDocumentsIntoGraphqlDocuments(...documentList.documents) });

const isArrayString$1 = (permissions) => {
    return permissions.every((permission) => typeof permission === 'string');
};
const convertObjectInfoArray$1 = (data) => {
    return Object.values(data);
};
var AdminCollection = (client) => {
    const databases = new nodeAppwrite.Databases(client);
    return class Collection {
        constructor(databaseId, collectionId) {
            this.databaseId = databaseId;
            this.collectionId = collectionId;
            this.databaseId = databaseId;
            this.collectionId = collectionId;
            this.atg = transformAppwriteToGraphql();
            this.atgDocumentList = transformAppwriteToGraphqlDocumentList();
        }
        createDocument(data, permissions = undefined, id = nodeAppwrite.ID.unique()) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if ((permissions && isArrayString$1(permissions)) || !permissions) {
                        const res = this.atg(yield databases.createDocument(this.databaseId, this.collectionId, id, data, permissions))[0];
                        if (!res)
                            throw new Error('Document has not been created');
                        return res;
                    }
                    else {
                        const res = this.atg(yield databases.createDocument(this.databaseId, this.collectionId, id, data, permissionslib__namespace.owner(...permissions.map((user) => user.$id))))[0];
                        if (!res)
                            throw new Error('Document has not been created');
                        return res;
                    }
                }
                catch (error) {
                    console.log(`Error:${error} databaseId: ${this.databaseId} collectionId: ${this.collectionId}`);
                    throw error;
                }
            });
        }
        updateDocument(param, data, permissions = undefined) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!Array.isArray(permissions) && permissions)
                    permissions = convertObjectInfoArray$1(permissions);
                const res = this.atg(yield databases.updateDocument(this.databaseId, this.collectionId, typeof param === 'string' ? param : param._id, data !== null && data !== void 0 ? data : {}, permissions))[0];
                if (!res)
                    throw new Error('Document was not updated');
                return res;
            });
        }
        updatePermissions(documentId, permissions = undefined) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!Array.isArray(permissions) && permissions)
                    permissions = convertObjectInfoArray$1(permissions);
                const res = this.atg(yield databases.updateDocument(this.databaseId, this.collectionId, typeof documentId === 'string' ? documentId : documentId._id, {}, permissions))[0];
                if (!res)
                    throw new Error('Permissions were no updated');
                return res;
            });
        }
        deleteDocument(param) {
            return __awaiter(this, void 0, void 0, function* () {
                //	console.log(Array.isArray(param) && isArrayString(param))
                if (typeof param === 'string') {
                    return databases.deleteDocument(this.databaseId, this.collectionId, param);
                }
                else if (Array.isArray(param) && isArrayString$1(param)) {
                    const document = yield this.getDocument(param);
                    if (!document)
                        throw new Error('document that is requeste was not found, check permissions first');
                    return yield this.deleteDocument(document._id);
                } //else if ((param as TDocumentGet) && !Array.isArray(param)) {
                return databases.deleteDocument(this.databaseId, this.collectionId, param._id);
            });
        }
        //delete documents with node-appwrite
        deleteDocuments(filters) {
            return __awaiter(this, void 0, void 0, function* () {
                const { documents } = yield this.listDocuments(filters);
                if (documents.length === 0)
                    throw new TypeError('No document found to delete');
                return yield Promise.all(documents.map((document) => this.deleteDocument(document._id)));
            });
        }
        getDocument(params) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let data;
                if (typeof params === 'string') {
                    try {
                        data =
                            (_a = (yield this.atg(yield databases.getDocument(this.databaseId, this.collectionId, params))[0])) !== null && _a !== void 0 ? _a : null;
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
                if (typeof (data === null || data === void 0 ? void 0 : data._permissions) === 'object' && !Array.isArray(data === null || data === void 0 ? void 0 : data._permissions))
                    data._permissions = convertObjectInfoArray$1(data._permissions);
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
                    queries.push(nodeAppwrite.Query.offset(offset));
                if (limit !== -1)
                    queries.push(nodeAppwrite.Query.limit(limit));
                if (orderType !== null)
                    queries.push(orderType === 'ASC' ? nodeAppwrite.Query.orderAsc('') : nodeAppwrite.Query.orderDesc(''));
                const data = this.atgDocumentList(yield databases.listDocuments(this.databaseId, this.collectionId, queries));
                data.documents = data.documents.map((document) => (Object.assign(Object.assign({}, document), { _pemissions: Array.isArray(document._permissions)
                        ? document._permissions
                        : convertObjectInfoArray$1(document._permissions) })));
                return data;
            });
        }
        delete() {
            return databases.delete(this.databaseId);
        }
        listCollections() {
            return databases.listCollections(this.databaseId);
        }
        list() {
            return databases.list();
        }
        create(name) {
            return databases.create(this.databaseId, name);
        }
        get() {
            return databases.get(this.databaseId);
        }
        update(name) {
            return databases.update(this.databaseId, name);
        }
        createCollection(collectionId, collectionName) {
            return databases.createCollection(this.databaseId, collectionId, collectionName);
        }
        getCollection(collectionId) {
            return databases.getCollection(this.databaseId, collectionId);
        }
        updateCollection(collectionId, collectionName) {
            return databases.updateCollection(this.databaseId, collectionId, collectionName);
        }
        deleteCollection(collectionId) {
            return databases.deleteCollection(this.databaseId, collectionId);
        }
        listAttributes(collectionId) {
            return databases.listAttributes(this.databaseId, collectionId);
        }
        //createAttribute(
        // 	attributeName: 'Boolean' | 'Datetime' | 'Email' | 'Enum' | 'Float' | 'Integer' | 'Ip' | 'Relationship' | 'Url' | 'String',
        // 	key: string,
        // 	required: boolean,
        // 	xdefault?: boolean | undefined,
        // 	array?: boolean | undefined,
        // ) {
        // 	return databases[`create${attributeName}Attribute`](this.databaseId, this.collectionId, key, required, xdefault, array) as Promise<
        // 		| Models.AttributeString
        // 		| Models.AttributeBoolean
        // 		| Models.AttributeDatetime
        // 		| Models.AttributeEmail
        // 		| Models.AttributeEnum
        // 		| Models.AttributeFloat
        // 		| Models.AttributeInteger
        // 		| Models.AttributeIp
        // 		| Models.AttributeList
        // 		| Models.AttributeRelationship
        // 		| Models.AttributeUrl
        // 	>
        // }
        getAttribute(attributeName) {
            return databases.getAttribute(this.databaseId, this.collectionId, attributeName.toString());
        }
        deleteAttribute(attributeName) {
            return databases.deleteAttribute(this.databaseId, this.collectionId, attributeName.toString());
        }
        updateRelationship(relationshipAttribute) {
            return databases.updateRelationshipAttribute(this.databaseId, this.collectionId, relationshipAttribute.toString());
        }
        listIndexes() {
            return databases.listIndexes(this.databaseId, this.collectionId);
        }
        createIndex(key, type, attributes) {
            return databases.createIndex(this.databaseId, this.collectionId, key, type, attributes.map((att) => attributes.toString()));
        }
        getIndex(key) {
            return databases.getIndex(this.databaseId, this.collectionId, key);
        }
        deleteIndex(key) {
            return databases.deleteIndex(this.databaseId, this.collectionId, key);
        }
    };
};

var setAdmin = (client) => {
    const users = new nodeAppwrite.Users(client);
    const avatars = new nodeAppwrite.Avatars(client);
    const functions = new nodeAppwrite.Functions(client);
    const graphql = new nodeAppwrite.Graphql(client);
    const health = new nodeAppwrite.Health(client);
    const locale = new nodeAppwrite.Locale(client);
    const Collection = AdminCollection(client);
    return {
        users,
        avatars,
        functions,
        graphql,
        health,
        locale,
        Collection,
    };
};

const isArrayString = (permissions) => {
    return permissions.every((permission) => typeof permission === 'string');
};
const convertObjectInfoArray = (data) => {
    return Object.values(data);
};
var databse_ = (client) => {
    const databases = new appwrite.Databases(client);
    return class Collection {
        constructor(databaseId, collectionId) {
            this.databaseId = databaseId;
            this.collectionId = collectionId;
            this.databaseId = databaseId;
            this.collectionId = collectionId;
            this.atg = transformAppwriteToGraphql();
            this.atgDocumentList = transformAppwriteToGraphqlDocumentList();
        }
        createDocument(data, permissions = undefined, id = appwrite.ID.unique()) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if ((permissions && isArrayString(permissions)) || !permissions) {
                        const res = this.atg(yield databases.createDocument(this.databaseId, this.collectionId, id, data, permissions))[0];
                        if (!res)
                            throw new Error('Document has not been created');
                        return res;
                    }
                    else {
                        const res = this.atg(yield databases.createDocument(this.databaseId, this.collectionId, id, data, permissionslib__namespace.owner(...permissions.map((user) => user.$id))))[0];
                        if (!res)
                            throw new Error('Document has not been created');
                        return res;
                    }
                }
                catch (error) {
                    console.log(`Error:${error} databaseId: ${this.databaseId} collectionId: ${this.collectionId}`);
                    throw error;
                }
            });
        }
        updateDocument(param, data, permissions = undefined) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!Array.isArray(permissions) && permissions)
                    permissions = convertObjectInfoArray(permissions);
                const res = this.atg(yield databases.updateDocument(this.databaseId, this.collectionId, typeof param === 'string' ? param : param._id, data !== null && data !== void 0 ? data : {}, permissions))[0];
                if (!res)
                    throw new Error('Document was not updated');
                return res;
            });
        }
        updatePermissions(documentId, permissions = undefined) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!Array.isArray(permissions) && permissions)
                    permissions = convertObjectInfoArray(permissions);
                const res = this.atg(yield databases.updateDocument(this.databaseId, this.collectionId, typeof documentId === 'string' ? documentId : documentId._id, {}, permissions))[0];
                if (!res)
                    throw new Error('Permissions were no updated');
                return res;
            });
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
                    return yield this.deleteDocument(document._id);
                } //else if ((param as TDocumentGet) && !Array.isArray(param)) {
                return databases.deleteDocument(this.databaseId, this.collectionId, param._id);
            });
        }
        //delete documents with node-appwrite
        deleteDocuments(filters) {
            return __awaiter(this, void 0, void 0, function* () {
                const { documents } = yield this.listDocuments(filters);
                if (documents.length === 0)
                    return [];
                return yield Promise.all(documents.map((document) => this.deleteDocument(document._id)));
            });
        }
        //delete all documents with node-appwrite
        deleteAllDocuments(filters = []) {
            return __awaiter(this, void 0, void 0, function* () {
                const { total } = yield this.listDocuments([...filters, appwrite.Query.limit(1)]);
                if (total === 0)
                    return [];
                const { documents } = yield this.listDocuments([...filters, appwrite.Query.limit(total)]);
                return yield Promise.all(documents.map((document) => this.deleteDocument(document._id)));
            });
        }
        getDocument(params) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let data;
                if (typeof params === 'string') {
                    try {
                        data =
                            (_a = (yield this.atg(yield databases.getDocument(this.databaseId, this.collectionId, params))[0])) !== null && _a !== void 0 ? _a : null;
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
                if (typeof (data === null || data === void 0 ? void 0 : data._permissions) === 'object' && !Array.isArray(data === null || data === void 0 ? void 0 : data._permissions))
                    data._permissions = convertObjectInfoArray(data._permissions);
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
                    queries.push(appwrite.Query.offset(offset));
                if (limit !== -1)
                    queries.push(appwrite.Query.limit(limit));
                if (orderType !== null)
                    queries.push(orderType === 'ASC' ? appwrite.Query.orderAsc('') : appwrite.Query.orderDesc(''));
                const data = this.atgDocumentList(yield databases.listDocuments(this.databaseId, this.collectionId, queries));
                data.documents = data.documents.map((document) => (Object.assign(Object.assign({}, document), { _pemissions: Array.isArray(document._permissions)
                        ? document._permissions
                        : convertObjectInfoArray(document._permissions) })));
                return data;
            });
        }
    };
};

var storage_ = (client) => {
    const storage = new appwrite.Storage(client);
    return class Bucket {
        constructor(bucketId) {
            this.bucketId = bucketId;
            this.bucketId = bucketId;
        }
        getFile(fileId) {
            return storage.getFile(this.bucketId, fileId);
        }
        getParamsFromURL(URL) {
            const fileId = URL.split('/')[8];
            const bucketId = URL.split('/')[6];
            return { fileId, bucketId };
        }
        createFile(base64, permissions = undefined, filename = 'file.png', type = 'image/png', fileId = appwrite.ID.unique()) {
            return __awaiter(this, void 0, void 0, function* () {
                const file = new File([base64], filename, { type: type });
                return yield storage.createFile(this.bucketId, fileId, file, permissions);
            });
        }
        deleteFile(file) {
            return storage.deleteFile(this.bucketId, typeof file === 'string' ? file : file.$id);
        }
        listFiles() {
            return storage.listFiles(this.bucketId);
        }
        updateFile(param, name, permissions = []) {
            return storage.updateFile(this.bucketId, typeof param === 'string' ? param : param.$id, name, permissions);
        }
        getFilePreview(file) {
            return storage.getFilePreview(this.bucketId, typeof file === 'string' ? file : file.$id);
        }
        getFileDownload(file) {
            return storage.getFileDownload(this.bucketId, typeof file === 'string' ? file : file.$id);
        }
        getFileView(file) {
            return storage.getFileView(this.bucketId, typeof file === 'string' ? file : file.$id);
        }
        getFileURL(fileId) {
            const url = `${client.config.endpoint}/storage/buckets/${this.bucketId}/files/${fileId}/view?project=${client.config.project}`;
            return url;
        }
        getIdFromURL(URL) {
            const id = URL.split('/')[6];
            return id;
        }
    };
};

class Locale extends appwrite.Locale {
    constructor(client) {
        super(client);
        this.locale = new appwrite.Locale(this.client);
    }
}

var setClient = (client, hostname) => {
    const Auth = account_(client, hostname);
    const Collection = databse_(client);
    const Bucket = storage_(client);
    const account = new Auth();
    const teams = new appwrite.Teams(client);
    const functions = new appwrite.Functions(client);
    const locale = new Locale(client);
    const avatars = new appwrite.Avatars(client);
    const graphql = new appwrite.Graphql(client);
    const databases = new appwrite.Databases(client);
    return {
        Auth,
        Collection,
        Bucket,
        account,
        teams,
        functions,
        locale,
        avatars,
        graphql,
        databases,
        client,
    };
};

const connections = (clientClient, clientAdmin, hostname, apiKey) => {
    const { endpoint, project } = clientClient.config;
    return {
        setSession: (session) => {
            clientClient.headers['X-Fallback-Cookies'] = JSON.stringify({
                [`a_session_${clientClient.config.project}`]: session,
            });
            return setClient(clientClient, hostname);
        },
        setCookie: (cookies) => {
            const session = getSessionFromCookie(project, cookies);
            if (!session)
                throw new Error('No session was found');
            return connections(clientClient, clientAdmin, hostname).setSession(session);
        },
        none: () => {
            return setClient(clientClient, hostname);
        },
        setAdmin: () => {
            if (!apiKey)
                throw new Error('Api key is not provided');
            return setAdmin(clientAdmin.setKey(apiKey));
        },
    };
};
const setProject = (params) => {
    const clientClient = new appwrite.Client().setEndpoint(params.endpoint).setProject(params.projectId);
    const clientAdmin = new nodeAppwrite.Client().setEndpoint(params.endpoint).setProject(params.projectId);
    return connections(clientClient, clientAdmin, params.hostname, params.apiKey);
};

var query = () => {
    return {
        equal: (attribute, value) => appwrite.Query.equal(attribute.toString(), value),
        between: (attribute, start, end) => appwrite.Query.between(attribute.toString(), start, end),
        cursorAfter: (documentId) => appwrite.Query.cursorAfter(documentId),
        cursorBefore: (documentId) => appwrite.Query.cursorBefore(documentId),
        endsWith: (attribute, value) => appwrite.Query.endsWith(attribute.toString(), value),
        greaterThan: (attribute, value) => appwrite.Query.greaterThan(attribute.toString(), value),
        greaterThanEqual: (attribute, value) => appwrite.Query.greaterThanEqual(attribute.toString(), value),
        isNotNull: (attribute) => appwrite.Query.isNotNull(attribute.toString()),
        isNull: (attribute) => appwrite.Query.isNull(attribute.toString()),
        lessThan: (attribute, value) => appwrite.Query.lessThan(attribute.toString(), value),
        lessThanEqual: (attribute, value) => appwrite.Query.lessThanEqual(attribute.toString(), value),
        limit: (limit) => appwrite.Query.limit(limit),
        notEqual: (attribute, value) => appwrite.Query.notEqual(attribute.toString(), value),
        offset: (offset) => appwrite.Query.offset(offset),
        orderAsc: (attribute) => appwrite.Query.orderAsc(attribute.toString()),
        orderDesc: (attribute) => appwrite.Query.orderDesc(attribute.toString()),
        search: (attribute, value) => appwrite.Query.search(attribute.toString(), value),
        select: (attributes) => appwrite.Query.select(attributes.map((att) => att.toString())),
        startsWith: (attribute, value) => appwrite.Query.startsWith(attribute.toString(), value),
    };
};

var index = { setProject };

exports.appwrite = appwrite__namespace;
exports.permissions = permissionslib__namespace;
exports.Query = query;
exports.appwriteGraphqlKeys = appwriteGraphqlKeys;
exports.appwriteKeys = appwriteKeys;
exports.default = index;
exports.getSessionFromCookie = getSessionFromCookie;
exports.setProject = setProject;
exports.transformAppwriteDocumentsIntoGraphqlDocuments = transformAppwriteDocumentsIntoGraphqlDocuments;
//# sourceMappingURL=index.js.map
