declare const _default: <DatabaseType extends Record<string, any>>() => {
    equal: <TKey extends keyof DatabaseType>(attribute: TKey, value: DatabaseType[TKey] | DatabaseType[TKey][]) => string;
    between: (attribute: keyof DatabaseType, start: number, end: number) => string;
    cursorAfter: (documentId: string) => string;
    cursorBefore: (documentId: string) => string;
    endsWith: <TKey_1 extends keyof DatabaseType>(attribute: keyof DatabaseType, value: DatabaseType[TKey_1]) => string;
    greaterThan: <TKey_2 extends keyof DatabaseType>(attribute: keyof DatabaseType, value: DatabaseType[TKey_2]) => string;
    greaterThanEqual: <TKey_3 extends keyof DatabaseType>(attribute: keyof DatabaseType, value: DatabaseType[TKey_3]) => string;
    isNotNull: (attribute: keyof DatabaseType) => string;
    isNull: (attribute: keyof DatabaseType) => string;
    lessThan: <TKey_4 extends keyof DatabaseType>(attribute: keyof DatabaseType, value: DatabaseType[TKey_4]) => string;
    lessThanEqual: <TKey_5 extends keyof DatabaseType>(attribute: keyof DatabaseType, value: DatabaseType[TKey_5]) => string;
    limit: (limit: number) => string;
    notEqual: <TKey_6 extends keyof DatabaseType>(attribute: keyof DatabaseType, value: DatabaseType[TKey_6]) => string;
    offset: (offset: number) => string;
    orderAsc: (attribute: keyof DatabaseType) => string;
    orderDesc: (attribute: keyof DatabaseType) => string;
    search: (attribute: keyof DatabaseType, value: string) => string;
    select: (attributes: (keyof DatabaseType)[]) => string;
    startsWith: <TKey_7 extends keyof DatabaseType>(attribute: keyof DatabaseType, value: DatabaseType[TKey_7]) => string;
};
export default _default;
//# sourceMappingURL=query.d.ts.map