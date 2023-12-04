"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationQueries = void 0;
const appwrite_1 = require("appwrite");
/**
 * @param meters is in the meters not degrees
 */
const locationQueries = (location, meters) => {
    const range = meters / 96700;
    console.log(range);
    const rangeLatitudeMax = location[0] + range;
    const rangeLatitudeMin = location[0] - range;
    const rangeLongitudeMax = location[1] + range;
    const rangeLongitudeMin = location[1] - range;
    console.log({
        rangeLatitudeMax,
        rangeLatitudeMin,
        rangeLongitudeMax,
        rangeLongitudeMin,
    });
    return [
        appwrite_1.Query.lessThanEqual('latitude', rangeLatitudeMax),
        appwrite_1.Query.greaterThanEqual('latitude', rangeLatitudeMin),
        appwrite_1.Query.lessThanEqual('longitude', rangeLongitudeMax),
        appwrite_1.Query.greaterThanEqual('longitude', rangeLongitudeMin),
    ];
};
exports.locationQueries = locationQueries;
