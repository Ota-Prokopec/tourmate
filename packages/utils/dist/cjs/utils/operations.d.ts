import type { Base64 } from '@app/ts-types';
export declare function getParsed(parsing: string): any;
export declare const uniqueArrayItems: (arr: Array<any>) => any[];
export declare function removeItemsFromArray<TArray extends unknown[]>(array: TArray, ...forDeletion: TArray[number][]): TArray;
export declare const base64ToBlob: (base64: string, contentType: string, sliceSize?: number) => Blob;
export declare const blobToBase64: (blob: Blob) => Promise<Base64>;
export declare const countSameItemsInArray: <InputArr extends any[]>(arr: InputArr) => Record<string, number>;
export declare const roundNumber: (num: number, digits: number) => number;
export declare const arrayBufferIntoBase64: (arrBuff: ArrayBuffer) => Base64;
export declare const fileToBase64: (file: File) => Promise<Base64>;
export declare const base64ToFile: (base64: Base64, fileName: string) => File;
//# sourceMappingURL=operations.d.ts.map