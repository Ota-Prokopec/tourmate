export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'OPTIONS';
type Body = {
    [key: string]: unknown;
};
declare const fetchnative: (path: string, method: Method, body?: Body | undefined, headers?: HeadersInit) => Promise<any>;
export default fetchnative;
export declare const post: (path: string, body?: Body | undefined, headers?: HeadersInit) => Promise<any>;
export declare const get: (path: string, body?: Body | undefined, headers?: HeadersInit) => Promise<any>;
//# sourceMappingURL=fetching.d.ts.map