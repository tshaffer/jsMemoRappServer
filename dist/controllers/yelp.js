"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
// GET
// https://api.yelp.com/v3/businesses/a8gk25_MTKdtoOwBsiraDQ
// HEADERS
//    Authorization: Bearer iCc5e5KyLW6OQitdmTMSLk53WmKl5AytoKywhcSCdwG3a2_kexCyIe_Sn4OCLXnKR58kIpQ3mvfr9gD7C2qkFGl92gSFxdEhCWT8XFoYJRUQ627DADQwMJuMAkhJXnYx
const apiKey = 'iCc5e5KyLW6OQitdmTMSLk53WmKl5AytoKywhcSCdwG3a2_kexCyIe_Sn4OCLXnKR58kIpQ3mvfr9gD7C2qkFGl92gSFxdEhCWT8XFoYJRUQ627DADQwMJuMAkhJXnYx';
function fetchYelpData(endPoint) {
    return new Promise((resolve, reject) => {
        const options = {
            host: 'api.yelp.com',
            path: '/v3/' + endPoint,
            port: 443,
            headers: {
                Authorization: 'Bearer ' + apiKey,
            },
        };
        let str = '';
        https_1.default.get(options, (res) => {
            res.on('data', (d) => {
                str += d;
            });
            res.on('end', () => {
                const data = JSON.parse(str);
                resolve(data);
            });
        }).on('error', (err) => {
            console.log('Caught exception: ' + err);
            reject(err);
        });
    });
}
function fetchYelpBusinessDetails(yelpId) {
    // const endPoint: string = 'businesses/a8gk25_MTKdtoOwBsiraDQ';
    const endPoint = 'businesses/' + yelpId;
    return fetchYelpData(endPoint);
}
exports.fetchYelpBusinessDetails = fetchYelpBusinessDetails;
function fetchYelpBusinessByLocation(latitude, longitude, radius, sortBy, searchTerm) {
    // const endPoint: string = 'businesses/search?latitude=37.380421&longitude=-122.115631';
    // const endPoint: string = 'businesses/search?latitude=' + latitude.toString() + '&longitude=' + longitude.toString();
    const endPoint = 'businesses/search'
        + '?latitude=' + latitude.toString()
        + '&longitude=' + longitude.toString()
        + '&radius=' + radius.toString()
        + '&sort_by=' + sortBy
        + '&term=' + searchTerm;
    return fetchYelpData(endPoint);
}
exports.fetchYelpBusinessByLocation = fetchYelpBusinessByLocation;
function fetchYelpBusinesses(latitude, longitude, radius, sortBy, searchTerm, categories, limit) {
    const endPoint = 'businesses/search'
        + '?latitude=' + latitude.toString()
        + '&longitude=' + longitude.toString()
        + '&radius=' + radius.toString()
        + '&sort_by=' + sortBy
        + '&term=' + searchTerm
        + '&categories=' + categories
        + '&limit=' + limit.toString();
    return fetchYelpData(endPoint);
}
exports.fetchYelpBusinesses = fetchYelpBusinesses;
//# sourceMappingURL=yelp.js.map