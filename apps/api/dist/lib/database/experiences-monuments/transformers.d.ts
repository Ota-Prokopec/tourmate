import { Types } from '@app/appwrite-ssr-graphql';
import type { Location } from '@app/ts-types';
export declare const fromLatDocumentLongIntoLocationDocument: <TDocument extends Types.Document<{
    latitude: number;
    longitude: number;
} & Record<string, any>>>(...docs: TDocument[]) => (Pick<TDocument, Exclude<keyof TDocument, "longitude" | "latitude">> & {
    location: Location;
})[];
//# sourceMappingURL=transformers.d.ts.map