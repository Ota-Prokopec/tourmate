import { Models } from 'appwrite';
import { Client } from 'appwrite';
declare const _default: (client: Client) => {
    new (bucketId: string): {
        bucketId: string;
        getParamsFromURL(URL: URL): {
            fileId: string | undefined;
            bucketId: string | undefined;
        };
        createFile(file: File, permissions?: string[]): Promise<Models.File>;
        deleteFile(file: string | Models.File): Promise<{}>;
        getFile(fileId: string): Promise<Models.File>;
        updateFile(id: string, name: string, permissions: string[] | undefined): Promise<Models.File>;
        updateFile(file: Models.File, name: string, permissions: string[] | undefined): Promise<Models.File>;
        getFilePreview(file: string | Models.File): URL;
        getFileDownload(file: string | Models.File): URL;
        getFileView(file: string | Models.File): URL;
        getFileURL(fileId: string): URL;
        getIdFromURL(URL: string): string | undefined;
    };
};
export default _default;
//# sourceMappingURL=storage.d.ts.map