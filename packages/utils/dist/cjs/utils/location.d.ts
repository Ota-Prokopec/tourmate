import type { IP, IPApiResponse, Location } from '@app/ts-types';
export declare const metersOfOneDegree = 111000;
export declare const getUsersLocation: (options?: PositionOptions) => Promise<Location>;
export declare const watchUsersLocation: (callback: (location: Location) => void, options?: PositionOptions) => void;
export declare const getUsersLocationDataByIP: (ip: IP) => Promise<IPApiResponse>;
export declare const degreeToMeters: (degree: number) => number;
export declare const metersToDegree: (meters: number) => number;
/**
 * @returns time in seconds
 */
export declare const getTimeFromAToB: (location1: Location, location2: Location, speed: number) => number;
export declare const getLocationUrlOfGoogleMaps: (location: Location) => string;
/**
 * @returns meters
 */
export declare const distanceTo: (location1: Location, location2: Location) => number;
//# sourceMappingURL=location.d.ts.map