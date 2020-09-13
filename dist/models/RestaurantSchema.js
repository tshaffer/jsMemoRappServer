"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
// https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const RestaurantSchema = new Schema({
    restaurantName: { type: String, required: true },
    yelpBusinessDetails: { type: Schema.Types.Mixed },
    tags: [{ type: String }],
    // export interface ReviewsByUsersMap {
    //   [userName: string]: UserReviewsEntity;
    // }
    // export interface UserReviewsEntity {
    //   userName: string;
    //   wouldReturn: boolean;
    //   userTags: string[];
    //   visitReviews: VisitReviewEntity[];
    // }
    reviewsByUser: { type: Schema.Types.Mixed },
}, { minimize: false });
exports.default = mongoose.model('Restaurant', RestaurantSchema);
//# sourceMappingURL=RestaurantSchema.js.map