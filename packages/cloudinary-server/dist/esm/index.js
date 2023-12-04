import { v2 } from 'cloudinary';

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

class Cloudinary {
    constructor(options, folder) {
        this.options = options;
        this.folder = folder;
    }
    uploadBase64(base64) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield v2.uploader.upload(base64, Object.assign(Object.assign({}, this.options), { folder: this.folder })));
        });
    }
    deleteFiles(...files) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield v2.api.delete_resources(files.map((file) => `${this.folder}/${file}`));
        });
    }
    getFileNameFromUrl(url) {
        const splits = url.toString().split('/');
        const fileSplit = splits[splits.length - 1];
        if (!fileSplit)
            throw new Error('Invalid URL - not able to be splitted');
        const file = fileSplit.replace('.webp', '');
        return file;
    }
}

var buckets_ = (options, rootFileName) => {
    const monuments = new Cloudinary(options, `${rootFileName}/monuments`);
    const profilePictures = new Cloudinary(options, `${rootFileName}/profilePictures`);
    const experiences = new Cloudinary(options, `${rootFileName}/experiences`);
    return {
        monuments,
        profilePictures,
        experiences,
    };
};

const options = v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
    secure: true,
});
const rootFileName = 'experienceApp';
const buckets = buckets_(options, rootFileName);

export { buckets as default };
//# sourceMappingURL=index.js.map
