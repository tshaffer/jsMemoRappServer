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
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    yelpBusinessDetails: { type: Schema.Types.Mixed },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    usersReviews: [{
            userName: { type: String, required: true },
            tags: [{
                    value: { type: String },
                }],
            reviews: [{
                    date: { type: Date, default: Date.now, required: true },
                    comments: { type: String },
                    rating: { type: Number, required: true },
                    wouldReturn: { type: Boolean },
                }],
        }],
}, { minimize: false });
exports.default = mongoose.model('Restaurant', RestaurantSchema);
//# sourceMappingURL=Restaurant.js.map