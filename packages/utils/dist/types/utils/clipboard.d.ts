export declare const clipboard: {
    read: (typeStartsWith: string) => Promise<ClipboardItem[]>;
    readImage: () => Promise<File | null>;
    copy: (value: string) => Promise<void>;
};
//# sourceMappingURL=clipboard.d.ts.map