'use strict';

var utils = require('@app/utils');
var ImageJs = require('image-js');
var store = require('svelte/store');
var canvasTxt = require('canvas-txt');

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

var rotate = (image, degree) => {
    return image.rotate(degree);
};

var getCtx = (image) => {
    const canvas = image.getCanvas();
    const ctx = canvas.getContext('2d');
    return ctx;
};

var addText = (image, text, options) => __awaiter(void 0, void 0, void 0, function* () {
    const ctx = yield getCtx(image);
    if (!ctx)
        throw new Error('Ctx is not available');
    ctx.fillStyle = options.color;
    canvasTxt.drawText(ctx, text, options);
    const newImage = yield ImageJs.load(ctx.canvas.toDataURL('image/png'));
    return newImage;
});

var crop = (image, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { width: canvasWidth, height: canvasHeight } = image.getCanvas();
    if (options.width === 'max')
        options.width = canvasWidth;
    if (options.height === 'max')
        options.height = canvasHeight;
    if (options.x === 'center')
        options.x = (canvasWidth - options.width) / 2;
    if (options.y === 'center')
        options.y = (canvasHeight - options.height) / 2;
    console.log(options);
    return image.crop({
        height: options.height,
        width: options.width,
        x: options.x,
        y: options.y,
    });
});

var index = ({ howManyImagesBeforeUndoAvailable = 1 }, change, undo) => {
    const ableToUndo = store.writable(false);
    let image = new ImageJs();
    const historyStore = store.writable([]);
    let history = []; //this is for that you had in history your first picture that you passed
    historyStore.subscribe((his) => {
        // update history for non svelte code
        history = his;
    });
    class Functions {
        rotate(degree) {
            return __awaiter(this, void 0, void 0, function* () {
                return rotate(image, degree);
            });
        }
        addText(...args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield addText(image, ...args);
            });
        }
        addFilter(filter) {
            return __awaiter(this, void 0, void 0, function* () {
                if (filter === 'grey') {
                    return image.grey();
                }
                return image[`${filter}Filter`]();
            });
        }
        load(url) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield ImageJs.load(url);
            });
        }
        loadCanvas(canvas) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.load(canvas.toDataURL('image/png'));
            });
        }
        loadImage(imagejs) {
            return __awaiter(this, void 0, void 0, function* () {
                return imagejs;
            });
        }
        addImage(image, coords) {
            return __awaiter(this, void 0, void 0, function* () {
                const ctx = yield this.getCtx();
                if (!ctx)
                    throw new Error('Ctx is not available');
                ctx.drawImage(image, ...coords);
                return yield this.load(ctx.canvas.toDataURL('image/png'));
            });
        }
        getCtx() {
            return __awaiter(this, void 0, void 0, function* () {
                return getCtx(image);
            });
        }
        undo() {
            return __awaiter(this, void 0, void 0, function* () {
                if (history.length < howManyImagesBeforeUndoAvailable + 1)
                    return;
                historyStore.update((curHis) => curHis.splice(0, curHis.length - 1)); //remove picture from history
                const Img = history.at(-1);
                if (!Img)
                    throw new Error('Image is not available');
                image = Img;
                ableToUndo.set(history.length > howManyImagesBeforeUndoAvailable);
                const url = `data:image/png;base64,${yield image.toBase64()}`;
                if (change)
                    change(url, Object.assign({}, image), 'undo', history, image);
                if (undo)
                    undo(url, Object.assign({}, image), history, image);
            });
        }
        crop(options) {
            return __awaiter(this, void 0, void 0, function* () {
                return crop(image, options);
            });
        }
        flipY() {
            return __awaiter(this, void 0, void 0, function* () {
                return image.flipY();
            });
        }
        flipX() {
            return __awaiter(this, void 0, void 0, function* () {
                return image.flipX();
            });
        }
    }
    const Actions = utils.executeFunctionBeforeAndAfterClassMethod(Functions, {
        after: (resPromise, MyClass, propertyName) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield resPromise;
            if (res instanceof ImageJs) {
                image = yield res;
                historyStore.update((currentHistory) => [...currentHistory, image]); //add picture into history
                ableToUndo.set(history.length > howManyImagesBeforeUndoAvailable);
                const url = `data:image/png;base64,${yield image.toBase64()}`;
                if (change)
                    change(url, Object.assign({}, image), propertyName, history, image);
            }
        }),
    }, { after: ['undo'] });
    const actions = new Actions();
    return [actions, ableToUndo, historyStore];
};

module.exports = index;
//# sourceMappingURL=index.js.map
