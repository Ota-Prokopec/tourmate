'use strict';

var zod = require('zod');
var geolocationUtils = require('geolocation-utils');
var date = require('date-fns');
var tsTypes = require('@app/ts-types');

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

var geolocationUtils__namespace = /*#__PURE__*/_interopNamespaceDefault(geolocationUtils);
var date__namespace = /*#__PURE__*/_interopNamespaceDefault(date);

const zodSchema = zod.z.object({
    response: zod.z.object({
        errors: zod.z.array(zod.z.object({
            message: zod.z.string(),
            extensions: zod.z.object({
                code: zod.z.string(),
            }),
        })),
    }),
});
const parseApolloError = (response) => {
    return zodSchema.parse(response);
};

// @ts-nocheck
const getUniqueListBy = (array, keys) => {
    if (!array)
        return [];
    if (!keys.length || !array.length)
        return [];
    return Array.from(array).reduce((list, item) => {
        const hasItem = list.find((listItem) => Array.from(keys).every((key) => listItem[key] === item[key]));
        if (!hasItem)
            list.push(item);
        return list;
    }, []);
};

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

function executeFunctionBeforeAndAfterClassMethod(classs, funs, excludedMethods) {
    Object.getOwnPropertyNames(classs.prototype).forEach((propertyName) => {
        classs.prototype[`_${propertyName.toString()}`] = classs.prototype[propertyName];
        classs.prototype[propertyName] = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                if (funs === null || funs === void 0 ? void 0 : funs.before) {
                    if (excludedMethods &&
                        excludedMethods.before &&
                        excludedMethods.before.includes(propertyName))
                        return;
                    const beforeRes = yield funs.before(classs, propertyName);
                    if (!beforeRes)
                        return;
                    if (beforeRes !== true)
                        classs = beforeRes;
                }
                let result = this['_' + propertyName.toString()](...args);
                if (funs === null || funs === void 0 ? void 0 : funs.after) {
                    if (!(excludedMethods &&
                        excludedMethods.after &&
                        excludedMethods.after.includes(propertyName))) {
                        const afterRes = yield funs.after(result, classs, propertyName);
                        if (afterRes)
                            result = afterRes;
                    }
                }
                return result;
            });
        };
    });
    return classs;
}

const read = (typeStartsWith) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield navigator.clipboard.read();
    return items.filter((item) => {
        const types = item.types;
        let ok = false;
        types.forEach((type) => {
            if (type.startsWith(typeStartsWith))
                ok = true;
        });
        return ok;
    });
});
const readImage = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const clipboard = (_a = (yield read('image'))[0]) !== null && _a !== void 0 ? _a : (yield read('text'))[0];
    const blob = yield (clipboard === null || clipboard === void 0 ? void 0 : clipboard.getType('image/png'));
    if (!blob)
        throw new Error('Blob not found');
    const file = new File([blob], 'image.png', { type: 'image/png' });
    return clipboard ? file : null;
});
const copy = (value) => {
    return navigator.clipboard.writeText(value);
};
const clipboard = { read, readImage, copy };

const colors = [
    'rgba(219, 112, 147, 1)', // PaleVioletRed
    'rgba(255, 69, 0, 1)', // Red-Orange
    'rgba(32, 178, 170, 1)', // LightSeaGreen
    'rgba(255, 105, 180, 1)', // HotPink
    'rgba(0, 255, 255, 1)', // Cyan
    'rgba(255, 165, 0, 1)', // Orange
    'rgba(135, 206, 235, 1)', // SkyBlue
    'rgba(255, 250, 205, 1)', // LemonChiffon
    'rgba(240, 255, 240, 1)', // Honeydew
    'rgba(245, 245, 220, 1)', // Beige
    'rgba(173, 216, 230, 1)', // LightBlue
    'rgba(255, 222, 173, 1)', // NavajoWhite
    'rgba(144, 238, 144, 1)', // LightGreen
    'rgba(255, 228, 225, 1)', // MistyRose
    'rgba(173, 216, 230, 1)', // LightBlue
    'rgba(175, 238, 238, 1)', // PaleTurquoise
    'rgba(250, 128, 114, 1)', // Salmon
    'rgba(152, 251, 152, 1)', // PaleGreen
    'rgba(255, 165, 0, 1)', // Orange
    'rgba(255, 0, 0, 1)', // Red
    'rgba(127, 255, 212, 1)', // Aquamarine
    'rgba(220, 20, 60, 1)', // Crimson
    'rgba(50, 205, 50, 1)', // LimeGreen
    'rgba(255, 105, 180, 1)', // HotPink
    'rgba(0, 128, 128, 1)', // Teal
    'rgba(255, 69, 0, 1)', // Red-Orange
    'rgba(0, 255, 0, 1)', // Lime
    'rgba(173, 216, 230, 1)', // LightBlue
    'rgba(0, 255, 255, 1)', // Cyan
    'rgba(255, 69, 0, 1)', // Red-Orange
    'rgba(220, 20, 60, 1)', // Crimson
    'rgba(255, 105, 180, 1)', // HotPink
    'rgba(255, 228, 225, 1)', // MistyRose
    'rgba(32, 178, 170, 1)', // LightSeaGreen
    'rgba(175, 238, 238, 1)', // PaleTurquoise
    'rgba(255, 165, 0, 1)', // Orange
    'rgba(135, 206, 235, 1)', // SkyBlue
    'rgba(250, 128, 114, 1)', // Salmon
    'rgba(152, 251, 152, 1)', // PaleGreen
    'rgba(219, 112, 147, 1)', // PaleVioletRed
    'rgba(255, 0, 0, 1)', // Red
    'rgba(127, 255, 212, 1)', // Aquamarine
    'rgba(0, 128, 128, 1)', // Teal
    'rgba(255, 69, 0, 1)', // Red-Orange
    'rgba(0, 255, 0, 1)', // Lime
    'rgba(144, 238, 144, 1)', // LightGreen
    'rgba(255, 165, 0, 1)', // Orange
    'rgba(32, 178, 170, 1)', // LightSeaGreen
    'rgba(255, 222, 173, 1)', // NavajoWhite
    'rgba(240, 255, 240, 1)', // Honeydew
    'rgba(240, 248, 255, 1)', // AliceBlue
    'rgba(255, 228, 196, 1)', // Bisque
    'rgba(255, 250, 205, 1)', // LemonChiffon
];

const recognizeWidth = () => {
    if (typeof window !== 'object')
        return null;
    if (document.body.offsetWidth < 640)
        return 'mobile';
    else if (document.body.offsetWidth < 768)
        return 'sm';
    else if (document.body.offsetWidth < 1024)
        return 'md';
    else if (document.body.offsetWidth < 1280)
        return 'lg';
    else if (document.body.offsetWidth < 1536)
        return 'xl';
    else
        return '2xl';
};
const device = { recognizeWidth };

const generator = (function* () {
    let index = -1;
    while (true)
        yield index++;
})();
const elementIdGenerator = (pre = 'input') => `${pre.split(' ').join('-')}-${generator.next().value}`;

const fetchnative = (path, method, body = undefined, headers = []) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(path, {
        method: method,
        body: JSON.stringify(body),
        headers: headers,
    });
    return yield res.json();
});
const post = (path, body = undefined, headers = []) => {
    return fetchnative(path, 'POST', body, headers);
};
const get = (path, body = undefined, headers = []) => {
    return fetchnative(path, 'GET', body, headers);
};

const isTrivial$1 = (val) => val === null || val === undefined || typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean';
function proxify(storage, shalow, key, curr) {
    return new Proxy(curr, {
        get(target, prop) {
            return proxify(storage, shalow, key, target[prop.toString()]);
        },
        set(target, prop, value) {
            target[prop.toString()] = value;
            storage.setItem(key, JSON.stringify(shalow));
            return true;
        },
        deleteProperty(target, prop) {
            delete target[prop.toString()];
            storage.setItem(key, JSON.stringify(shalow));
            return true;
        },
        has(target, prop) {
            return prop in target;
        },
        ownKeys(target) {
            return Object.keys(target);
        },
        getOwnPropertyDescriptor(target, prop) {
            return Object.getOwnPropertyDescriptor(target, prop);
        },
    });
}

const isTrivial = (val) => typeof val !== 'object' && typeof val !== 'function';
const isBrowser = () => typeof window !== 'undefined';
new Proxy({}, {
    set(_target, key, value) {
        if (!isBrowser())
            throw new TypeError('Window is not defined');
        if (!isTrivial(value)) {
            window.localStorage.setItem(key.toString(), JSON.stringify(value, (_key, value) => typeof value === 'string' ? `'${value}'` : value));
            return true;
        }
        window.localStorage.setItem(key.toString(), value.toString());
        return true;
    },
    deleteProperty(_target, key) {
        if (!isBrowser())
            throw new TypeError('Window is not defined');
        window.localStorage.removeItem(key.toString());
        return true;
    },
    get(_target, key) {
        console.log(key);
        const item = window.localStorage.getItem(key.toString());
        if (!item)
            return null;
        try {
            const shalowObject = JSON.parse(item);
            return proxify(window.localStorage, shalowObject, key.toString(), shalowObject);
        }
        catch (e) {
            return item;
        }
    },
    has(_target, key) {
        return window.localStorage.getItem(key.toString()) !== null;
    },
    ownKeys() {
        return Object.keys(window.localStorage);
    },
    getOwnPropertyDescriptor(_target, key) {
        return {
            configurable: true,
            enumerable: true,
            value: window.localStorage.getItem(key.toString()),
            writable: true,
        };
    },
    apply(target, thisArg, args) {
        return target.apply(thisArg, args);
    },
});

const metersOfOneDegree = 111000;
const getUsersLocation = (options = { enableHighAccuracy: false }) => {
    return new Promise((res) => {
        if (typeof window === 'undefined')
            throw new Error('You called this on server side');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                res([position.coords.latitude, position.coords.longitude]);
            }, (err) => {
                throw err;
            }, options);
        }
        else {
            throw new Error('Users location was not successfull');
        }
    });
};
const watchUsersLocation = (callback, options = { enableHighAccuracy: true }) => {
    navigator.geolocation.watchPosition((position) => {
        callback([position.coords.latitude, position.coords.longitude]);
    }, () => { }, options);
};
const getUsersLocationDataByIP = (ip) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield get(`https://ipapi.co/${ip}/json/`);
    return res;
});
const degreeToMeters = (degree) => {
    return degree * metersOfOneDegree;
};
const metersToDegree = (meters) => {
    return meters / metersOfOneDegree;
};
/**
 * @returns time in seconds
 */
const getTimeFromAToB = (location1, location2, speed) => {
    const distance = geolocationUtils__namespace.distanceTo({ lat: location1[0], lng: location1[1] }, { lat: location2[0], lng: location2[1] });
    return distance / speed;
};
const getLocationUrlOfGoogleMaps = (location) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${location[0]},${location[1]}`;
};
/**
 * @returns meters
 */
const distanceTo = (location1, location2) => geolocationUtils__namespace.distanceTo({ lat: location1[0], lng: location1[1] }, { lat: location2[0], lng: location2[1] });

const getPrettyNumber = (value) => {
    return Intl.NumberFormat('en', { notation: 'compact' }).format(Math.floor(value));
};

const normalizeMeters = (meters) => {
    return `${getPrettyNumber(meters)}m`;
};
const normalizeTime = (seconds, delimeter) => {
    const duration = date__namespace.intervalToDuration({ start: 0, end: seconds * 1000 });
    const formated = date__namespace.formatDuration(duration, {
        delimiter: delimeter ? ` ${delimeter} ` : undefined,
    });
    return formated;
};

const notify = (title, options) => __awaiter(void 0, void 0, void 0, function* () {
    options = Object.assign(Object.assign({}, options), {
        icon: '/icon.png',
        badge: '/icon.png',
    });
    const res = yield Notification.requestPermission();
    if (res === 'denied')
        throw new Error('user denied the permissions for notifications');
    const notification = new Notification(title, options);
    return notification;
});

const removeKeysFromObject = (obj, keys) => {
    return Object.entries(obj)
        .filter(([key]) => !keys.includes(key))
        .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
};

function getParsed(parsing) {
    return parsing[0] === '[' || parsing[0] === '{' ? JSON.parse(parsing) : parsing;
}
const uniqueArrayItems = (arr) => {
    return arr.filter((item, i, arr) => {
        if (arr.indexOf(item) === i)
            return item;
    });
};
function removeItemsFromArray(array, ...forDeletion) {
    return array.filter((item) => !forDeletion.includes(item));
}
const base64ToBlob = (base64, contentType, sliceSize = 512) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
};
const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
};
const countSameItemsInArray = (arr) => arr.reduce((cnt, cur) => ((cnt[typeof cur === 'string' ? cur : JSON.stringify(cur)] =
    cnt[typeof cur === 'string' ? cur : JSON.stringify(cur)] + 1 || 1),
    cnt), {});
const roundNumber = (num, digits) => {
    const value = JSON.parse(num.toFixed(digits));
    if (typeof value === 'number')
        return value;
    throw new Error('Input is not a number');
};
const arrayBufferIntoBase64 = (arrBuff) => Buffer.from(arrBuff).toString('base64');
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
    });
};
const base64ToFile = (base64, fileName) => {
    const buffer = Buffer.from(base64, 'base64');
    return new File([buffer], fileName);
};

const getThemeInternalMode = () => {
    var _a;
    return ((_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, '(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
};

const isBase64 = (value) => {
    if (typeof value !== 'string')
        return false;
    return value.startsWith('data:image/');
};
const isFile = (value) => {
    if (value instanceof File)
        return true;
    return false;
};
const isURL = (value) => {
    return typeof value === 'string' && value.startsWith('http');
};
const urlToString = (url) => {
    return url;
};
const isLocation = (arg) => Array.isArray(arg) &&
    typeof arg[0] === 'number' &&
    typeof arg[1] === 'number' &&
    arg.length === 2;
const isTopic = (arg) => {
    try {
        tsTypes.topicZod.parse(arg);
        return true;
    }
    catch (error) {
        return false;
    }
};
const isTransport = (arg) => {
    try {
        tsTypes.transportZod.parse(arg);
        return true;
    }
    catch (error) {
        return false;
    }
};

const changeURLwithoutReloading = (url) => {
    window.history.pushState('', '', url);
};

exports.arrayBufferIntoBase64 = arrayBufferIntoBase64;
exports.base64ToBlob = base64ToBlob;
exports.base64ToFile = base64ToFile;
exports.blobToBase64 = blobToBase64;
exports.changeURLwithoutReloading = changeURLwithoutReloading;
exports.clipboard = clipboard;
exports.colors = colors;
exports.countSameItemsInArray = countSameItemsInArray;
exports.degreeToMeters = degreeToMeters;
exports.device = device;
exports.distanceTo = distanceTo;
exports.elementIdGenerator = elementIdGenerator;
exports.executeFunctionBeforeAndAfterClassMethod = executeFunctionBeforeAndAfterClassMethod;
exports.fileToBase64 = fileToBase64;
exports.get = get;
exports.getLocationUrlOfGoogleMaps = getLocationUrlOfGoogleMaps;
exports.getParsed = getParsed;
exports.getPrettyNumber = getPrettyNumber;
exports.getThemeInternalMode = getThemeInternalMode;
exports.getTimeFromAToB = getTimeFromAToB;
exports.getUniqueListBy = getUniqueListBy;
exports.getUsersLocation = getUsersLocation;
exports.getUsersLocationDataByIP = getUsersLocationDataByIP;
exports.isBase64 = isBase64;
exports.isFile = isFile;
exports.isLocation = isLocation;
exports.isTopic = isTopic;
exports.isTransport = isTransport;
exports.isTrivial = isTrivial$1;
exports.isURL = isURL;
exports.metersOfOneDegree = metersOfOneDegree;
exports.metersToDegree = metersToDegree;
exports.normalizeMeters = normalizeMeters;
exports.normalizeTime = normalizeTime;
exports.notify = notify;
exports.parseApolloError = parseApolloError;
exports.post = post;
exports.proxify = proxify;
exports.removeItemsFromArray = removeItemsFromArray;
exports.removeKeysFromObject = removeKeysFromObject;
exports.roundNumber = roundNumber;
exports.uniqueArrayItems = uniqueArrayItems;
exports.urlToString = urlToString;
exports.watchUsersLocation = watchUsersLocation;
//# sourceMappingURL=index.js.map
