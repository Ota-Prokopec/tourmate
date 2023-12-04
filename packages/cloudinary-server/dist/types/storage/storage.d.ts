import { Base64 } from '@app/ts-types';
import { ConfigOptions, UploadApiResponse } from 'cloudinary';
export declare class Cloudinary {
    options: ConfigOptions;
    folder: string;
    constructor(options: ConfigOptions, folder: string);
    uploadBase64(base64: Base64 | string): Promise<UploadApiResponse & {
        url: URL;
    }>;
    deleteFiles(...files: string[]): Promise<any>;
    getFileNameFromUrl(url: URL): string;
}
//# sourceMappingURL=storage.d.ts.map