import { isNil } from 'lodash';
import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';
import User from '../models/User';
import { fetchYelpBusinessDetails, fetchYelpBusinessByLocation } from './yelp';
import { Document } from 'mongoose';

import { UserEntity, TagEntity, RestaurantEntity } from '../types';
import {
  createUserDocuments,
  createTagDocuments,
  createRestaurantDocuments,
  createRestaurantReviewDocuments,
} from './dbInterface';

export const populateUsers = () => {
  const userEntities: UserEntity[] = [
    { userName: 'ted', password: 'letTedIn', email: 'ted@pizza.com' },
    { userName: 'lori', password: 'letLoriIn', email: 'lori@peony.com' },
    { userName: 'rachel', password: 'letRachelIn', email: 'rachel@babies.com' },
  ];
  return createUserDocuments(userEntities);
};

export const populateTags = () => {
  const tagEntities: TagEntity[] = [
    { value: 'Taqueria' },
    { value: 'Burritos' },
    { value: 'Pizza' },
    { value: 'Sandwiches' },
    { value: 'Meatball Sandwiches' },
    { value: 'Coffee' },
    { value: 'Pasta' },
  ];
  return createTagDocuments(tagEntities);
};

const getAllYelpData = (yelpBusinessIds: string[]): Promise<any[]> => {

  const yelpBusinessDetails: any[] = [];

  const processNextYelpBusiness = (index: number): Promise<number[]> => {
    console.log('processNextYelpBusiness, index: ' + index);

    if (index >= yelpBusinessIds.length) {
      return Promise.resolve(yelpBusinessDetails);
    }

    const yelpBusinessId: string = yelpBusinessIds[index];

    return fetchYelpBusinessDetails(yelpBusinessId)
      .then((businessDetails: any) => {

        if (!isNil(businessDetails.error)) {
          debugger;
        }

        yelpBusinessDetails.push(businessDetails);
        return processNextYelpBusiness(index + 1);
      });
  };

  return processNextYelpBusiness(0);
};

export const populateRestaurants = () => {
  const restaurants: RestaurantEntity[] = [
    {
      id: 'GHj6QfOe8278orCytIV7sA',
      name: 'Rosine\'s Restaurant',
      yelpBusinessDetails: { id: 'GHj6QfOe8278orCytIV7sA' },
      tags: [{ value: 'Pasta' }],
      reviews: [],
    },
    {
      id: 'oCEdsmtEQRnKPzLcfLMhzA',
      name: 'MidiCi',
      yelpBusinessDetails: { id: 'oCEdsmtEQRnKPzLcfLMhzA' },
      tags: [{ value: 'Pizza' }, { value: 'Sandwiches' }, { value: 'Meatball Sandwiches' }],
      reviews: [],
    },
    {
      id: 'wwEL0Gf0nrvNQvQERRrl_g',
      name: 'BrightCoffee',
      yelpBusinessDetails: { id: 'wwEL0Gf0nrvNQvQERRrl_g' },
      tags: [{ value: 'Coffee' }],
      reviews: [],
    },
    {
      id: 'OBcuNt19UJy6mH4z_jvPcw',
      name: 'Captain + Stoker',
      yelpBusinessDetails: { id: 'OBcuNt19UJy6mH4z_jvPcw' },
      tags: [{ value: 'Coffee' }],
      reviews: [],
    },
    {
      id: 'cwAyfIHDObQi8KCDe8Pw',
      name: 'La Costeña',
      yelpBusinessDetails: { id: 'Y-cwAyfIHDObQi8KCDe8Pw' },
      tags: [{ value: 'Taqueria' }, { value: 'Burritos' }],
      reviews: [],
    },
    {
      id: 'a8gk25_MTKdtoOwBsiraDQ',
      name: 'State Of Mind Public House & Pizzeria',
      yelpBusinessDetails: { id: 'a8gk25_MTKdtoOwBsiraDQ' },
      tags: [{ value: 'Pizza' }],
      reviews: [],
    },
    {
      id: 'SDism5DnPRDGJohjQDd',
      name: 'Chiquitas',
      yelpBusinessDetails: { id: 'SDism5DnPRDGJohjQDd-ng' },
      tags: [{ value: 'Taqueria' }, { value: 'Burritos' }],
      reviews: [],
    },
    {
      id: 'lIjvV6miih3O1eqW_w',
      name: 'Zoccolis',
      yelpBusinessDetails: { id: 'bD5-lIjvV6miih3O1eqW_w' },
      tags: [{ value: 'Sandwiches' }, { value: 'Meatball Sandwiches' }],
      reviews: [],
    },
    {
      id: 'wBMzAzT3haIsaA0JoDr1-Q',
      name: "Howie's Artisan Pizza",
      yelpBusinessDetails: { id: 'wBMzAzT3haIsaA0JoDr1-Q' },
      tags: [{ value: 'Pizza' }, { value: 'Sandwiches' }, { value: 'Meatball Sandwiches' }],
      reviews: [],
    },
    {
      id: 'tgx533AzRRPFVdVP2el2rw',
      name: 'High Street Market & Deli',
      yelpBusinessDetails: { id: 'tgx533AzRRPFVdVP2el2rw' },
      tags: [{ value: 'Sandwiches' }],
      reviews: [],
    },
    {
      id: 'C2e_QIpD0QgiHlu_2Ari0A',
      name: 'Pizza Chicago',
      yelpBusinessDetails: { id: 'C2e_QIpD0QgiHlu_2Ari0A' },
      tags: [{ value: 'Pizza' }],
      reviews: [],
    },
    {
      id: 'pLqiFFz1JScp8wMMyXcx-w',
      name: 'Terún',
      yelpBusinessDetails: { id: 'pLqiFFz1JScp8wMMyXcx-w' },
      tags: [{ value: 'Pizza'}, { value: 'Pasta' }],
      reviews: [],
    },
    {
      id: 'Ce5JgEwL7G3HwalAFBcZEQ',
      name: 'Napoletana Pizzeria',
      yelpBusinessDetails: { id: 'Ce5JgEwL7G3HwalAFBcZEQ' },
      tags: [{ value: 'Pizza' }, { value: 'Pasta' }],
      reviews: [],
    },
    {
      id: 'tXA2SpZ79lyWxuTwjZkkgg',
      name: 'Pizzeria La Bufala',
      yelpBusinessDetails: { id: 'tXA2SpZ79lyWxuTwjZkkgg' },
      tags: [{ value: 'Pizza' }, { value: 'Pasta' }],
      reviews: [],
    },
    {
      id: 'tKph0F6dMc9wnxpwjK4upA',
      name: 'Sandwich Bug',
      yelpBusinessDetails: { id: 'tKph0F6dMc9wnxpwjK4upA' },
      tags: [{ value: 'Sandwiches' }],
      reviews: [],
    },
    {
      id: 'wFEb3Yx4dlwObCeYpm3-Fw',
      name: 'Taqueria La Cazuela',
      yelpBusinessDetails: { id: 'wFEb3Yx4dlwObCeYpm3-Fw' },
      tags: [{ value: 'Taqueria' }, { value: 'Burritos' }],
      reviews: [],
    },
    {
      id: 'FI5J97RTWw9vxGtLWvpEGA',
      name: 'Los Gallos Taqueria',
      yelpBusinessDetails: { id: 'FI5J97RTWw9vxGtLWvpEGA' },
      tags: [{ value: 'Taqueria' }, { value: 'Burritos' }],
      reviews: [],
    },
    {
      id: 'DT74WaOqIZkiL1otlxNhQg',
      name: 'Cafe Iveta',
      yelpBusinessDetails: { id: 'DT74WaOqIZkiL1otlxNhQg' },
      tags: [{ value: 'Coffee' }],
      reviews: [],
    },
    {
      id: 'AzoWYX6pPjbEMajA86caqg',
      name: 'Verve Palo Alto',
      yelpBusinessDetails: { id: 'AzoWYX6pPjbEMajA86caqg' },
      tags: [{ value: 'Coffee' }],
      reviews: [],
    },
    {
      id: 'W0JveBM6AVr35_lr5-EXTg',
      name: 'Firefly',
      yelpBusinessDetails: { id: 'W0JveBM6AVr35_lr5-EXTg' },
      tags: [{ value: 'Coffee' }],
      reviews: [],
    },
    {
      id: 'jiVieLy9l_FtoWQASmMlag',
      name: 'Saint Frank',
      yelpBusinessDetails: { id: 'jiVieLy9l_FtoWQASmMlag' },
      tags: [{ value: 'Coffee' }],
      reviews: [],
    },
    {
      id: 'yVWJXJVDIAmUspOl4t57Dg',
      name: 'Bluestone Lane',
      yelpBusinessDetails: { id: 'yVWJXJVDIAmUspOl4t57Dg' },
      tags: [{ value: 'Coffee' }],
      reviews: [],
    },
    {
      id: 'z4RM2qx5Gi-Igsns9e-6Hw',
      name: 'Zombie Runner',
      yelpBusinessDetails: { id: 'z4RM2qx5Gi-Igsns9e-6Hw' },
      tags: [{ value: 'Coffee' }],
      reviews: [],
    },
    {
      id: 'AqpZTy5jF-lncQ0048LVdA',
      name: 'Caffè Bonini',
      yelpBusinessDetails: { id: 'AqpZTy5jF-lncQ0048LVdA' },
      tags: [{ value: 'Coffee' }],
      reviews: [],
    },
  ];

  const yelpBusinessIds: string[] = restaurants.map((restaurant: any) => {
    return restaurant.yelpBusinessDetails.id;
  });

  return getAllYelpData(yelpBusinessIds).then((yelpBusinessDetails: any[]) => {
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
    return createRestaurantDocuments(restaurants);
  });
};

export const populateRestaurantReviews = () => {

  const reviews: any[] = [];

  // LaCostena
  return createRestaurantReviewDocuments('Y-cwAyfIHDObQi8KCDe8Pw', [
    {
      userName: 'ted',
      comments: 'Pollo Borracho: flavorful juicy. Carne Asada - a little dry.',
      rating: 8,
      wouldReturn: true,
      date: new Date(),
    },
    {
      userName: 'lori',
      comments: 'Carne asada is consistently good. Tres tacos - chile verde good; carnitas also good.',
      rating: 8.5,
      wouldReturn: true,
      date: new Date(),
    },
    {
      userName: 'rachel',
      comments: 'Super burritos are the best. Perfect to take home to Seattle',
      rating: 8.6,
      wouldReturn: true,
      date: new Date(),
    },
  ]).then((laCostena: Document) => {
    reviews.push(laCostena);

    // Rosine's
    return createRestaurantReviewDocuments('GHj6QfOe8278orCytIV7sA', [
      {
        userName: 'ted',
        comments: 'Very good food. Fast service (maybe too fast). Large portions. Not cheap. Lots of families. Strong moscow mule.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'lori',
        comments: '',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((rosines: Document) => {
    reviews.push(rosines);

    // MiDiCi
    return createRestaurantReviewDocuments('oCEdsmtEQRnKPzLcfLMhzA', [
      {
        userName: 'ted',
        comments: 'Burrata and prosciutto pizza - good, not great. Burrata cooked with the pizza. Really good meatball panini',
        rating: 7,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'lori',
        comments: '',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((midici: Document) => {
    reviews.push(midici);

    // BrightCoffee
    return createRestaurantReviewDocuments('wwEL0Gf0nrvNQvQERRrl_g', [
      {
        userName: 'ted',
        comments: 'Good vanilla latte, though slightly sweet. Very tasty scone. Nice vibe. Went early in the morning twice.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((brightCoffee: Document) => {
    reviews.push(brightCoffee);

    // Captain + Stoker
    return createRestaurantReviewDocuments('OBcuNt19UJy6mH4z_jvPcw', [
      {
        userName: 'ted',
        comments: 'Good latte. Nice cycling decor. Fairly crowded mid-morning - lucky to get a seat.',
        rating: 7,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'lori',
        comments: '',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((captainStoker: Document) => {
    reviews.push(captainStoker);

    // State of Mind
    return createRestaurantReviewDocuments('a8gk25_MTKdtoOwBsiraDQ', [
      {
        userName: 'ted',
        comments: 'Grandmas Pie is my favorite. Goat cheese is good as well. Gets very crowded. Outdoor seating mostly in the shade.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'lori',
        comments: 'Great pizza. Good beer list.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((stateOfMind: Document) => {
    reviews.push(stateOfMind);

    // Chiquitas
    return createRestaurantReviewDocuments('SDism5DnPRDGJohjQDd-ng', [
      {
        userName: 'ted',
        comments: 'Flavorful and juicy burritos. Fun little place.',
        rating: 7,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'lori',
        comments: 'Good carnitas burrito.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((chiquitas: Document) => {
    reviews.push(chiquitas);

    // Zoccoli's
    return createRestaurantReviewDocuments('bD5-lIjvV6miih3O1eqW_w', [
      {
        userName: 'ted',
        comments: 'Meatball sandwiches very good. Get soggy fairly quickly. Chicken pesto tasty but chicken is a little dry.',
        rating: 7,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'lori',
        comments: 'Good chicken pesto sandwich. Good meatball sandwich. Call your order in. Stopped ordering pastrami.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((zoccolis: Document) => {
    reviews.push(zoccolis);

    // Howie's Artisan Pizza
    return createRestaurantReviewDocuments('wBMzAzT3haIsaA0JoDr1-Q', [
      {
        userName: 'lori',
        comments: 'Delicious pizza.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'Pizza Bianco is one of my favorites. Next best - arugula/prosciutto. Pesto is good as well.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // High Street Market & Deli
    return createRestaurantReviewDocuments('tgx533AzRRPFVdVP2el2rw', [
      {
        userName: 'lori',
        comments: 'Delicious sandwiches. Pastrami.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'Turkey and pesto, hold the lettuce. One of my favorite sandwiches anywhere. Gets very crowded.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Pizza Chicago
    return createRestaurantReviewDocuments('C2e_QIpD0QgiHlu_2Ari0A', [
      {
        userName: 'lori',
        comments: 'Takeout only. Delicious pizza',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'Buttery crust. Excellent sausage. Watch out for diced tomatoes. Takeout only for us.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Terun
    return createRestaurantReviewDocuments('pLqiFFz1JScp8wMMyXcx-w', [
      {
        userName: 'lori',
        comments: 'Sit out in patio. Delicious food. Good cocktails. Good wine.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'Schiacciata (burrata and prosciutto). Terun pizza is 2nd favorite. Pasta with Ragu is really good.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Napoletana Pizzeria
    return createRestaurantReviewDocuments('Ce5JgEwL7G3HwalAFBcZEQ', [
      {
        userName: 'lori',
        comments: 'Good caesar. Awesome limoncello.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'Carbonara really good. Flute limoncello - one of our favorite desserts. Lots families. Can get noisy.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Pizzeria La Bufala
    return createRestaurantReviewDocuments('tXA2SpZ79lyWxuTwjZkkgg', [
      {
        userName: 'lori',
        comments: 'Awesome gnocchi. Good salad. Good burrata. Great pizza. Good beer place next door.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'Pesto gnocchi is their best menu item. They seem open to letting you build your own pizza even though that is not on the menu.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Sandwich Bug
    return createRestaurantReviewDocuments('tKph0F6dMc9wnxpwjK4upA', [
      {
        userName: 'lori',
        comments: 'Pastrami could be hotter (temperature)',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'Bug bread, turkey, pepper jack, garlic & herb, and green pesto. Really good. Pretty big. Takes a long time to get sandwiches.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Taqueria La Cazuela
    return createRestaurantReviewDocuments('wFEb3Yx4dlwObCeYpm3-Fw', [
      {
        userName: 'lori',
        comments: 'Carnitas hit or miss. Dislike salsa, but likes chips.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'Chips / salsa excellent. Burritos are good (no onions / cilanto, hot sauce) but need lots of salsa to make them juicy enough. Excellent outdoor garden seating.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Los Gallos Taqueria
    return createRestaurantReviewDocuments('FI5J97RTWw9vxGtLWvpEGA', [
      {
        userName: 'lori',
        comments: 'Favorite carnitas!',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'Order regular grilled chicken burrito, no salsa, add cheese. Very good but needs lots of salsa.',
        rating: 8,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Cafe Iveta
    return createRestaurantReviewDocuments('DT74WaOqIZkiL1otlxNhQg', [
      {
        userName: 'lori',
        comments: 'Food takes a long time. Often run out of large mugs.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'A little inconsistent but used to make excellent lattes with really creamy milk. Spicy egg biscuit is my favorite. We also sometimes get the scrambled egg sandwich. Try the breakfast burrito.',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Verve Palo Alto
    return createRestaurantReviewDocuments('AzoWYX6pPjbEMajA86caqg', [
      {
        userName: 'lori',
        comments: 'Kind of crowded. A little slow.',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'ted',
        comments: 'Great outdoor seating.',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Firefly
    return createRestaurantReviewDocuments('W0JveBM6AVr35_lr5-EXTg', [
      {
        userName: 'ted',
        comments: 'Latte is almost always way too hot, so it\'s good to get to go. I recall really liking the flavor of their coffee.',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Saint Frank
    return createRestaurantReviewDocuments('jiVieLy9l_FtoWQASmMlag', [
      {
        userName: 'ted',
        comments: 'Seem really into the coffee making. No syrups.',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'lori',
        comments: '',
        rating: 9,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Bluestone Lane
    return createRestaurantReviewDocuments('yVWJXJVDIAmUspOl4t57Dg', [
      {
        userName: 'ted',
        comments: 'Good latte. Great outdoor seating. Food was good, not great but way overpriced.',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Zombie Runner
    return createRestaurantReviewDocuments('z4RM2qx5Gi-Igsns9e-6Hw', [
      {
        userName: 'ted',
        comments: 'Very good latte.',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);

    // Caffe Bonini
    return createRestaurantReviewDocuments('AqpZTy5jF-lncQ0048LVdA', [
      {
        userName: 'ted',
        comments: 'Really like this place. Good latte.',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
      {
        userName: 'lori',
        comments: '',
        rating: 5,
        wouldReturn: true,
        date: new Date(),
      },
    ]);
  }).then((docs: Document) => {
    reviews.push(docs);
    return Promise.resolve(reviews);
  });
};

export const populateDb = (request: Request, response: Response, next: any) => {
  let users: any;
  let tags: any;
  let restaurants: any;
  let restaurantReviews: any;

  populateUsers()
    .then((userDocuments: Document[]) => {
      users = userDocuments;
      return populateTags();
    }).then((tagDocuments: Document[]) => {
      tags = tagDocuments;
      return populateRestaurants();
    }).then((restaurantDocuments: Document[]) => {
      restaurants = restaurantDocuments;
      return populateRestaurantReviews();
    }).then((restaurantReviewDocuments: Document[]) => {
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
