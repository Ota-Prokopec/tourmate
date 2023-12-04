export interface Storage {
    readonly length: number;
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
    [name: string]: any;
}
export declare const isTrivial: (val: unknown) => val is string | number | boolean | null | undefined;
export declare function proxify(storage: Storage, shalow: Record<string, any>, key: string, curr: Record<string, any>): Record<string, any>;
//# sourceMappingURL=treasureUtils.d.ts.map