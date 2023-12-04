/// <reference types="svelte" />
import { Base64 } from '@app/ts-types';
import ImageJs, { Image } from 'image-js';
import crop from './actions/crop';
export type Filter = 'blur' | 'median' | 'sobel' | 'scharr' | 'gaussian' | 'grey';
export type Actions = 'rotate' | 'addText' | 'addFilter' | 'load' | 'getCtx' | 'undo' | 'crop' | 'flipY' | 'flipX';
declare const _default: ({ howManyImagesBeforeUndoAvailable }: {
    howManyImagesBeforeUndoAvailable: number;
}, change?: ((url: string | Base64, options: {
    width: number;
    height: number;
}, action: Actions, history: ImageJs[], imageJs: ImageJs) => void) | undefined, undo?: ((url: string | Base64, options: {
    width: number;
    height: number;
}, history: ImageJs[], imageJs: ImageJs) => void) | undefined) => readonly [{
    rotate(degree: number): Promise<ImageJs>;
    addText(text: string, options: import("canvas-txt").CanvasTextConfig & {
        color: string;
    }): Promise<ImageJs>;
    addFilter(filter: Filter): Promise<ImageJs>;
    load(url: string | Base64): Promise<ImageJs>;
    loadCanvas(canvas: HTMLCanvasElement): Promise<ImageJs>;
    loadImage(imagejs: ImageJs): Promise<ImageJs>;
    addImage(image: Image, coords: [number, number]): Promise<ImageJs>;
    getCtx(): Promise<CanvasRenderingContext2D | null>;
    undo(): Promise<void>;
    crop(options: Parameters<typeof crop>[1]): Promise<ImageJs>;
    flipY(): Promise<ImageJs>;
    flipX(): Promise<ImageJs>;
}, import("svelte/store").Writable<boolean>, import("svelte/store").Writable<ImageJs[]>];
export default _default;
//# sourceMappingURL=index.d.ts.map