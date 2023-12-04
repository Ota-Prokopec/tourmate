import { connections } from '../connection';
export declare namespace Types {
    type Cookie = Record<'name' | 'value', string>;
    type AppwriteSSR = ReturnType<typeof connections>;
    type IndexTypes = 'Key' | 'Unique' | 'FullText';
    type DocumentSkeleton = {
        _id: string;
        _collectionId: string;
        _databaseId: string;
        _createdAt: string;
        _updatedAt: string;
        _permissions: string[];
    };
    type Document<T extends Partial<DocumentSkeleton> & object> = {
        [Key in keyof T]: T[Key] extends Record<string, unknown> ? Document<T[Key]> : T[Key];
    } & DocumentSkeleton;
    type DatabaseValue = string | number | string[] | number[] | boolean | URL | undefined | null | any[] | Record<string, string | number | string[] | number[] | boolean | URL | undefined | null>;
}
//# sourceMappingURL=Types.d.ts.map