import { Base64, Location } from '@app/ts-types';
export declare const isBase64: (value: unknown) => value is Base64;
export declare const isFile: (value: unknown) => value is File;
export declare const isURL: (value: unknown) => value is URL;
export declare const urlToString: (url: URL | undefined | null) => string | undefined;
export declare const isLocation: (arg: unknown) => arg is Location;
export declare const isTopic: (arg: unknown) => arg is "castle" | "monument" | "person" | "animals" | "hiking";
export declare const isTransport: (arg: unknown) => arg is "train" | "bus" | "car" | "walk" | "bike";
//# sourceMappingURL=typeCheking.d.ts.map