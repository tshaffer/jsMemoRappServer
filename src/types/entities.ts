export interface UserEntity {
  userName: string;
  password: string;
  email: string;
}

export interface TagEntity {
  value: string;
}

export interface RestaurantReviewEntity {
  userName: string;
  date: Date;
  comments: string;
  rating: number;
  wouldReturn: boolean;
}

export interface RestaurantEntity {
  restaurantName: string;
  location?: GeoLocation;
  yelpBusinessDetails: any;
  tags: TagEntity[];
  reviews: RestaurantReviewEntity[];
}

export interface GeoLocation {
  type: string;
  coordinates: number[];
}
