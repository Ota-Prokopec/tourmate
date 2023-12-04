import connection from '../connection/connection';
export declare namespace Types {
    type Appwrite = ReturnType<typeof connection>;
    type IndexTypes = 'Key' | 'Unique' | 'FullText';
    type DocumentSkeleton = {
        $id: string;
        $collectionId: string;
        $databaseId: string;
        $createdAt: string;
        $updatedAt: string;
        $permissions: string[];
    };
    type Document<T extends Partial<DocumentSkeleton> & object> = {
        [Key in keyof T]: T[Key] extends Record<string, unknown> ? Document<T[Key]> : T[Key];
    } & DocumentSkeleton;
    type DatabaseValue = string | number | string[] | number[] | boolean | URL | undefined | null | any[] | Record<string, string | number | string[] | number[] | boolean | URL | undefined | null>;
}
//# sourceMappingURL=Types.d.ts.map