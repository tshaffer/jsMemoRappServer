"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tag_1 = __importDefault(require("../models/Tag"));
const User_1 = __importDefault(require("../models/User"));
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const lodash_1 = require("lodash");
exports.createUserDocuments = (userDocuments) => {
    return new Promise((resolve, reject) => {
        User_1.default.collection.insert(userDocuments, (err, docs) => {
            if (err) {
                console.log(err);
                if (err.code === 11000) {
                    console.log('createUserDocuments: duplicate key error');
                    resolve([]);
                }
                else {
                    reject(err);
                }
            }
            else {
                console.log(docs);
                resolve(docs);
            }
        });
    });
};
exports.createUserDocument = (userEntity) => {
    return User_1.default.create(userEntity)
        .then((user) => {
        return Promise.resolve(user);
    });
};
exports.getUser = (userName, password) => {
    const query = User_1.default.findOne({ userName, password });
    const promise = query.exec();
    return promise
        .then((userDocument) => {
        const user = userDocument.toObject();
        return Promise.resolve(user);
    }).catch((err) => {
        return Promise.reject(err);
    });
};
exports.createTagDocuments = (tagDocuments) => {
    return new Promise((resolve, reject) => {
        Tag_1.default.collection.insert(tagDocuments, (err, docs) => {
            if (err) {
                console.log(err);
                if (err.code === 11000) {
                    console.log('createTagDocuments: duplicate key error');
                    resolve([]);
                }
                else {
                    reject(err);
                }
            }
            else {
                console.log(docs);
                resolve(docs);
            }
        });
    });
};
exports.createTagDocument = (tagEntity) => {
    return Tag_1.default.create(tagEntity)
        .then((tag) => {
        return Promise.resolve(tag);
    });
};
function getTagsFromDb() {
    const query = Tag_1.default.find({});
    const promise = query.exec();
    return promise.then((tagDocuments) => {
        const tagEntities = tagDocuments.map((tagDocument) => {
            return tagDocument.toObject();
        });
        return Promise.resolve(tagEntities);
    });
}
exports.getTagsFromDb = getTagsFromDb;
exports.createRestaurantDocument = (restaurantEntity) => {
    console.log('createRestaurantDocument');
    console.log(restaurantEntity);
    return Restaurant_1.default.create(restaurantEntity)
        .then((restaurant) => {
        return Promise.resolve(restaurant);
    }).catch((err) => {
        console.log('ERROR - createRestaurantDocument: ', err);
    });
};
exports.createRestaurantDocuments = (restaurantDocuments) => {
    return new Promise((resolve, reject) => {
        Restaurant_1.default.collection.insert(restaurantDocuments, (err, docs) => {
            if (err) {
                console.log(err);
                if (err.code === 11000) {
                    console.log('createRestaurantDocuments: duplicate key error');
                    resolve([]);
                }
                else {
                    reject(err);
                }
            }
            else {
                console.log(docs);
                resolve(docs);
            }
        });
    });
};
exports.createRestaurantUsersReviewsDocuments = (yelpId, userReviews) => {
    const query = Restaurant_1.default.findOneAndUpdate({ 'yelpBusinessDetails.id': yelpId }, { userReviews });
    const promise = query.exec();
    return promise
        .then((restaurant) => {
        return Promise.resolve(restaurant);
    }).catch((err) => {
        console.log(err);
        debugger;
        return Promise.reject(err);
    });
};
exports.updateYelpBusinessDetails = (restaurantEntity) => {
    Restaurant_1.default.find({
        id: restaurantEntity.id,
    }, (err, restaurantDocs) => {
        if (lodash_1.isArray(restaurantDocs) && restaurantDocs.length === 1) {
            const restaurant = restaurantDocs[0];
            restaurant.yelpBusinessDetails = restaurantEntity.yelpBusinessDetails;
            restaurant.save();
        }
    });
};
//# sourceMappingURL=dbInterface.js.map