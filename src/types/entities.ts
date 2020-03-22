export interface UserEntity {
  userName: string;
  password: string;
  email: string;
}

export interface TagEntity {
  value: string;
}

export interface RestaurantVisitReviewEntity {
  date: Date;
  comments: string;
  rating: number;
}

export interface RestaurantReviewEntity {
  userName: string;
  wouldReturn: boolean;
  userTags: string[];
  visitReviews: RestaurantVisitReviewEntity[];
}

export interface RestaurantEntity {
  restaurantName: string;
  yelpBusinessDetails: any;
  tags: TagEntity[];
  reviews: RestaurantReviewEntity[];
}
