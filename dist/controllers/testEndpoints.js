"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const yelp_1 = require("./yelp");
const dbInterface_1 = require("./dbInterface");
exports.populateUsers = () => {
    const userEntities = [
        { userName: 'ted', password: 'letTedIn', email: 'ted@pizza.com' },
        { userName: 'lori', password: 'letLoriIn', email: 'lori@peony.com' },
        { userName: 'rachel', password: 'letRachelIn', email: 'rachel@babies.com' },
    ];
    return dbInterface_1.createUserDocuments(userEntities);
};
exports.populateTags = () => {
    const tagEntities = [
        { value: 'Taqueria' },
        { value: 'Burritos' },
        { value: 'Pizza' },
        { value: 'Sandwiches' },
        { value: 'Meatball Sandwiches' },
        { value: 'Coffee' },
        { value: 'Pasta' },
    ];
    return dbInterface_1.createTagDocuments(tagEntities);
};
const getAllYelpData = (yelpBusinessIds) => {
    const yelpBusinessDetails = [];
    const processNextYelpBusiness = (index) => {
        console.log('processNextYelpBusiness, index: ' + index);
        if (index >= yelpBusinessIds.length) {
            return Promise.resolve(yelpBusinessDetails);
        }
        const yelpBusinessId = yelpBusinessIds[index];
        return yelp_1.fetchYelpBusinessDetails(yelpBusinessId)
            .then((businessDetails) => {
            if (!lodash_1.isNil(businessDetails.error)) {
                console.log('error at index: ', index);
                processNextYelpBusiness(index);
            }
            yelpBusinessDetails.push(businessDetails);
            return processNextYelpBusiness(index + 1);
        });
    };
    return processNextYelpBusiness(0);
};
const getRestaurants = () => {
    const restaurants = [
        {
            id: 'GHj6QfOe8278orCytIV7sA',
            name: 'Rosine\'s Restaurant',
            yelpBusinessDetails: { id: 'GHj6QfOe8278orCytIV7sA' },
            // tags: [{ value: 'Pasta' }],
            usersReviews: [],
        },
        {
            id: 'oCEdsmtEQRnKPzLcfLMhzA',
            name: 'MidiCi',
            yelpBusinessDetails: { id: 'oCEdsmtEQRnKPzLcfLMhzA' },
            // tags: [{ value: 'Pizza' }, { value: 'Sandwiches' }, { value: 'Meatball Sandwiches' }],
            usersReviews: [],
        },
        {
            id: 'wwEL0Gf0nrvNQvQERRrl_g',
            name: 'BrightCoffee',
            yelpBusinessDetails: { id: 'wwEL0Gf0nrvNQvQERRrl_g' },
            // tags: [{ value: 'Coffee' }],
            usersReviews: [],
        },
        {
            id: 'OBcuNt19UJy6mH4z_jvPcw',
            name: 'Captain + Stoker',
            yelpBusinessDetails: { id: 'OBcuNt19UJy6mH4z_jvPcw' },
            // tags: [{ value: 'Coffee' }],
            usersReviews: [],
        },
        {
            id: 'cwAyfIHDObQi8KCDe8Pw',
            name: 'La Costeña',
            yelpBusinessDetails: { id: 'Y-cwAyfIHDObQi8KCDe8Pw' },
            // tags: [{ value: 'Taqueria' }, { value: 'Burritos' }],
            usersReviews: [],
        },
        {
            id: 'a8gk25_MTKdtoOwBsiraDQ',
            name: 'State Of Mind Public House & Pizzeria',
            yelpBusinessDetails: { id: 'a8gk25_MTKdtoOwBsiraDQ' },
            // tags: [{ value: 'Pizza' }],
            usersReviews: [],
        },
        {
            id: 'SDism5DnPRDGJohjQDd',
            name: 'Chiquitas',
            yelpBusinessDetails: { id: 'SDism5DnPRDGJohjQDd-ng' },
            // tags: [{ value: 'Taqueria' }, { value: 'Burritos' }],
            usersReviews: [],
        },
        {
            id: 'lIjvV6miih3O1eqW_w',
            name: 'Zoccolis',
            yelpBusinessDetails: { id: 'bD5-lIjvV6miih3O1eqW_w' },
            // tags: [{ value: 'Sandwiches' }, { value: 'Meatball Sandwiches' }],
            usersReviews: [],
        },
        {
            id: 'wBMzAzT3haIsaA0JoDr1-Q',
            name: "Howie's Artisan Pizza",
            yelpBusinessDetails: { id: 'wBMzAzT3haIsaA0JoDr1-Q' },
            // tags: [{ value: 'Pizza' }, { value: 'Sandwiches' }, { value: 'Meatball Sandwiches' }],
            usersReviews: [],
        },
        {
            id: 'tgx533AzRRPFVdVP2el2rw',
            name: 'High Street Market & Deli',
            yelpBusinessDetails: { id: 'tgx533AzRRPFVdVP2el2rw' },
            // tags: [{ value: 'Sandwiches' }],
            usersReviews: [],
        },
        {
            id: 'C2e_QIpD0QgiHlu_2Ari0A',
            name: 'Pizza Chicago',
            yelpBusinessDetails: { id: 'C2e_QIpD0QgiHlu_2Ari0A' },
            // tags: [{ value: 'Pizza' }],
            usersReviews: [],
        },
        {
            id: 'pLqiFFz1JScp8wMMyXcx-w',
            name: 'Terún',
            yelpBusinessDetails: { id: 'pLqiFFz1JScp8wMMyXcx-w' },
            // tags: [{ value: 'Pizza'}, { value: 'Pasta' }],
            usersReviews: [],
        },
        {
            id: 'Ce5JgEwL7G3HwalAFBcZEQ',
            name: 'Napoletana Pizzeria',
            yelpBusinessDetails: { id: 'Ce5JgEwL7G3HwalAFBcZEQ' },
            // tags: [{ value: 'Pizza' }, { value: 'Pasta' }],
            usersReviews: [],
        },
        {
            id: 'tXA2SpZ79lyWxuTwjZkkgg',
            name: 'Pizzeria La Bufala',
            yelpBusinessDetails: { id: 'tXA2SpZ79lyWxuTwjZkkgg' },
            // tags: [{ value: 'Pizza' }, { value: 'Pasta' }],
            usersReviews: [],
        },
        {
            id: 'tKph0F6dMc9wnxpwjK4upA',
            name: 'Sandwich Bug',
            yelpBusinessDetails: { id: 'tKph0F6dMc9wnxpwjK4upA' },
            // tags: [{ value: 'Sandwiches' }],
            usersReviews: [],
        },
        {
            id: 'wFEb3Yx4dlwObCeYpm3-Fw',
            name: 'Taqueria La Cazuela',
            yelpBusinessDetails: { id: 'wFEb3Yx4dlwObCeYpm3-Fw' },
            // tags: [{ value: 'Taqueria' }, { value: 'Burritos' }],
            usersReviews: [],
        },
        {
            id: 'FI5J97RTWw9vxGtLWvpEGA',
            name: 'Los Gallos Taqueria',
            yelpBusinessDetails: { id: 'FI5J97RTWw9vxGtLWvpEGA' },
            // tags: [{ value: 'Taqueria' }, { value: 'Burritos' }],
            usersReviews: [],
        },
        {
            id: 'DT74WaOqIZkiL1otlxNhQg',
            name: 'Cafe Iveta',
            yelpBusinessDetails: { id: 'DT74WaOqIZkiL1otlxNhQg' },
            // tags: [{ value: 'Coffee' }],
            usersReviews: [],
        },
        {
            id: 'AzoWYX6pPjbEMajA86caqg',
            name: 'Verve Palo Alto',
            yelpBusinessDetails: { id: 'AzoWYX6pPjbEMajA86caqg' },
            // tags: [{ value: 'Coffee' }],
            usersReviews: [],
        },
        {
            id: 'W0JveBM6AVr35_lr5-EXTg',
            name: 'Firefly',
            yelpBusinessDetails: { id: 'W0JveBM6AVr35_lr5-EXTg' },
            // tags: [{ value: 'Coffee' }],
            usersReviews: [],
        },
        {
            id: 'jiVieLy9l_FtoWQASmMlag',
            name: 'Saint Frank',
            yelpBusinessDetails: { id: 'jiVieLy9l_FtoWQASmMlag' },
            // tags: [{ value: 'Coffee' }],
            usersReviews: [],
        },
        {
            id: 'yVWJXJVDIAmUspOl4t57Dg',
            name: 'Bluestone Lane',
            yelpBusinessDetails: { id: 'yVWJXJVDIAmUspOl4t57Dg' },
            // tags: [{ value: 'Coffee' }],
            usersReviews: [],
        },
        {
            id: 'z4RM2qx5Gi-Igsns9e-6Hw',
            name: 'Zombie Runner',
            yelpBusinessDetails: { id: 'z4RM2qx5Gi-Igsns9e-6Hw' },
            // tags: [{ value: 'Coffee' }],
            usersReviews: [],
        },
        {
            id: 'AqpZTy5jF-lncQ0048LVdA',
            name: 'Caffè Bonini',
            yelpBusinessDetails: { id: 'AqpZTy5jF-lncQ0048LVdA' },
            // tags: [{ value: 'Coffee' }],
            usersReviews: [],
        },
        {
            id: 'EhlizSyoWmS1a9lp4wEVCQ',
            name: 'Pompeii',
            yelpBusinessDetails: { id: 'EhlizSyoWmS1a9lp4wEVCQ' },
            // tags: [{ value: 'Pasta' }],
            usersReviews: [],
        },
    ];
    return restaurants;
};
exports.populateRestaurants = () => {
    const restaurants = getRestaurants();
    const yelpBusinessIds = restaurants.map((restaurant) => {
        return restaurant.yelpBusinessDetails.id;
    });
    return getAllYelpData(yelpBusinessIds).then((yelpBusinessDetails) => {
        for (let i = 0; i < restaurants.length; i++) {
            restaurants[i].yelpBusinessDetails = yelpBusinessDetails[i];
            restaurants[i].location = {
                type: 'Point',
                coordinates: [
                    yelpBusinessDetails[i].coordinates.longitude,
                    yelpBusinessDetails[i].coordinates.latitude,
                ],
            };
        }
        return dbInterface_1.createRestaurantDocuments(restaurants);
    });
};
exports.populateRestaurantReviews = () => {
    const reviews = [];
    // LaCostena
    return dbInterface_1.createRestaurantUsersReviewsDocuments('Y-cwAyfIHDObQi8KCDe8Pw', [
        {
            userName: 'ted',
            tags: [],
            reviews: [{
                    comments: 'Pollo Borracho: flavorful juicy. Carne Asada - a little dry.',
                    rating: 8,
                    wouldReturn: true,
                    date: new Date(),
                }],
        },
        {
            userName: 'lori',
            tags: [],
            reviews: [{
                    comments: 'Carne asada is consistently good. Tres tacos - chile verde good; carnitas also good.',
                    rating: 8.5,
                    wouldReturn: true,
                    date: new Date(),
                }],
        },
        {
            userName: 'rachel',
            tags: [],
            reviews: [{
                    comments: 'Super burritos are the best. Perfect to take home to Seattle',
                    rating: 8.6,
                    wouldReturn: true,
                    date: new Date(),
                }],
        },
    ]).then((laCostena) => {
        reviews.push(laCostena);
        // Rosine's
        return dbInterface_1.createRestaurantUsersReviewsDocuments('GHj6QfOe8278orCytIV7sA', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Very good food. Fast service (maybe too fast). Large portions. Not cheap. Lots of families. Strong moscow mule.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: '',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((rosines) => {
        reviews.push(rosines);
        // MiDiCi
        return dbInterface_1.createRestaurantUsersReviewsDocuments('oCEdsmtEQRnKPzLcfLMhzA', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Burrata and prosciutto pizza - good, not great. Burrata cooked with the pizza. Really good meatball panini',
                        rating: 7,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: '',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((midici) => {
        reviews.push(midici);
        // BrightCoffee
        return dbInterface_1.createRestaurantUsersReviewsDocuments('wwEL0Gf0nrvNQvQERRrl_g', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Good vanilla latte, though slightly sweet. Very tasty scone. Nice vibe. Went early in the morning twice.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((brightCoffee) => {
        reviews.push(brightCoffee);
        // Captain + Stoker
        return dbInterface_1.createRestaurantUsersReviewsDocuments('OBcuNt19UJy6mH4z_jvPcw', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Good latte. Nice cycling decor. Fairly crowded mid-morning - lucky to get a seat.',
                        rating: 7,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: '',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((captainStoker) => {
        reviews.push(captainStoker);
        // State of Mind
        return dbInterface_1.createRestaurantUsersReviewsDocuments('a8gk25_MTKdtoOwBsiraDQ', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Grandmas Pie is my favorite. Goat cheese is good as well. Gets very crowded. Outdoor seating mostly in the shade.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Great pizza. Good beer list.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((stateOfMind) => {
        reviews.push(stateOfMind);
        // Chiquitas
        return dbInterface_1.createRestaurantUsersReviewsDocuments('SDism5DnPRDGJohjQDd-ng', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Flavorful and juicy burritos. Fun little place.',
                        rating: 7,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Good carnitas burrito.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((chiquitas) => {
        reviews.push(chiquitas);
        // Zoccoli's
        return dbInterface_1.createRestaurantUsersReviewsDocuments('bD5-lIjvV6miih3O1eqW_w', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Meatball sandwiches very good. Get soggy fairly quickly. Chicken pesto tasty but chicken is a little dry.',
                        rating: 7,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Good chicken pesto sandwich. Good meatball sandwich. Call your order in. Stopped ordering pastrami.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((zoccolis) => {
        reviews.push(zoccolis);
        // Howie's Artisan Pizza
        return dbInterface_1.createRestaurantUsersReviewsDocuments('wBMzAzT3haIsaA0JoDr1-Q', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Delicious pizza.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Pizza Bianco is one of my favorites. Next best - arugula/prosciutto. Pesto is good as well.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // High Street Market & Deli
        return dbInterface_1.createRestaurantUsersReviewsDocuments('tgx533AzRRPFVdVP2el2rw', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Delicious sandwiches. Pastrami.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Turkey and pesto, hold the lettuce. One of my favorite sandwiches anywhere. Gets very crowded.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Pizza Chicago
        return dbInterface_1.createRestaurantUsersReviewsDocuments('C2e_QIpD0QgiHlu_2Ari0A', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Takeout only. Delicious pizza',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Buttery crust. Excellent sausage. Watch out for diced tomatoes. Takeout only for us.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Terun
        return dbInterface_1.createRestaurantUsersReviewsDocuments('pLqiFFz1JScp8wMMyXcx-w', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Sit out in patio. Delicious food. Good cocktails. Good wine.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Schiacciata (burrata and prosciutto). Terun pizza is 2nd favorite. Pasta with Ragu is really good.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Napoletana Pizzeria
        return dbInterface_1.createRestaurantUsersReviewsDocuments('Ce5JgEwL7G3HwalAFBcZEQ', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Good caesar. Awesome limoncello.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Carbonara really good. Flute limoncello - one of our favorite desserts. Lots families. Can get noisy.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Pizzeria La Bufala
        return dbInterface_1.createRestaurantUsersReviewsDocuments('tXA2SpZ79lyWxuTwjZkkgg', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Awesome gnocchi. Good salad. Good burrata. Great pizza. Good beer place next door.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Pesto gnocchi is their best menu item. They seem open to letting you build your own pizza even though that is not on the menu.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Sandwich Bug
        return dbInterface_1.createRestaurantUsersReviewsDocuments('tKph0F6dMc9wnxpwjK4upA', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Pastrami could be hotter (temperature)',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Bug bread, turkey, pepper jack, garlic & herb, and green pesto. Really good. Pretty big. Takes a long time to get sandwiches.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Taqueria La Cazuela
        return dbInterface_1.createRestaurantUsersReviewsDocuments('wFEb3Yx4dlwObCeYpm3-Fw', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Carnitas hit or miss. Dislike salsa, but likes chips.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Chips / salsa excellent. Burritos are good (no onions / cilanto, hot sauce) but need lots of salsa to make them juicy enough. Excellent outdoor garden seating.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Los Gallos Taqueria
        return dbInterface_1.createRestaurantUsersReviewsDocuments('FI5J97RTWw9vxGtLWvpEGA', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Favorite carnitas!',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Order regular grilled chicken burrito, no salsa, add cheese. Very good but needs lots of salsa.',
                        rating: 8,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Cafe Iveta
        return dbInterface_1.createRestaurantUsersReviewsDocuments('DT74WaOqIZkiL1otlxNhQg', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Food takes a long time. Often run out of large mugs.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'A little inconsistent but used to make excellent lattes with really creamy milk. Spicy egg biscuit is my favorite. We also sometimes get the scrambled egg sandwich. Try the breakfast burrito.',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Verve Palo Alto
        return dbInterface_1.createRestaurantUsersReviewsDocuments('AzoWYX6pPjbEMajA86caqg', [
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: 'Kind of crowded. A little slow.',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Great outdoor seating.',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Firefly
        return dbInterface_1.createRestaurantUsersReviewsDocuments('W0JveBM6AVr35_lr5-EXTg', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Latte is almost always way too hot, so it\'s good to get to go. I recall really liking the flavor of their coffee.',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Saint Frank
        return dbInterface_1.createRestaurantUsersReviewsDocuments('jiVieLy9l_FtoWQASmMlag', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Seem really into the coffee making. No syrups.',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: '',
                        rating: 9,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Bluestone Lane
        return dbInterface_1.createRestaurantUsersReviewsDocuments('yVWJXJVDIAmUspOl4t57Dg', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Good latte. Great outdoor seating. Food was good, not great but way overpriced.',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Zombie Runner
        return dbInterface_1.createRestaurantUsersReviewsDocuments('z4RM2qx5Gi-Igsns9e-6Hw', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Very good latte.',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        // Caffe Bonini
        return dbInterface_1.createRestaurantUsersReviewsDocuments('AqpZTy5jF-lncQ0048LVdA', [
            {
                userName: 'ted',
                tags: [],
                reviews: [{
                        comments: 'Really like this place. Good latte.',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
            {
                userName: 'lori',
                tags: [],
                reviews: [{
                        comments: '',
                        rating: 5,
                        wouldReturn: true,
                        date: new Date(),
                    }],
            },
        ]);
    }).then((docs) => {
        reviews.push(docs);
        return Promise.resolve(reviews);
    });
};
exports.populateDb = (request, response, next) => {
    let users;
    let tags;
    let restaurants;
    let restaurantReviews;
    exports.populateUsers()
        .then((userDocuments) => {
        users = userDocuments;
        return exports.populateTags();
    }).then((tagDocuments) => {
        tags = tagDocuments;
        return exports.populateRestaurants();
    }).then((restaurantDocuments) => {
        restaurants = restaurantDocuments;
        return exports.populateRestaurantReviews();
    }).then((restaurantReviewDocuments) => {
        restaurantReviews = restaurantReviewDocuments;
        console.log('populateDB complete');
        response.status(201).json({
            success: true,
            users,
            tags,
            restaurants,
            restaurantReviews,
        });
    });
};
exports.updateYelpData = () => {
    const restaurants = getRestaurants();
    const yelpBusinessIds = restaurants.map((restaurant) => {
        return restaurant.yelpBusinessDetails.id;
    });
    return getAllYelpData(yelpBusinessIds).then((yelpBusinessDetails) => {
        for (let i = 0; i < restaurants.length; i++) {
            restaurants[i].yelpBusinessDetails = yelpBusinessDetails[i];
            console.log(yelpBusinessDetails[i]);
            dbInterface_1.updateYelpBusinessDetails(restaurants[i]);
        }
    });
};
//# sourceMappingURL=testEndpoints.js.map