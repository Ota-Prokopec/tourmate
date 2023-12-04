import { type Models } from 'appwrite';
import type { Client } from 'appwrite';
declare const _default: (client: Client) => {
    new (bucketId: string): {
        bucketId: string;
        getFile(fileId: string): Promise<Models.File>;
        getParamsFromURL(URL: string): {
            fileId: string | undefined;
            bucketId: string | undefined;
        };
        createFile(base64: string, permissions?: string[] | undefined, filename?: string, type?: string, fileId?: string): Promise<Models.File>;
        deleteFile(file: string | Models.File): Promise<{}>;
        listFiles(): Promise<Models.FileList>;
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