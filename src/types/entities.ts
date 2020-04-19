export interface UserEntity {
  userName: string;
  password: string;
  email: string;
}

export interface TagEntity {
  value: string;
}

export interface ReviewEntity {
  date: Date;
  comments: string;
  rating: number;
  wouldReturn: boolean;
}

export interface UserReviewsEntity {
  userName: string;
  tags: TagEntity[];
  reviews: ReviewEntity[];
}

export interface RestaurantEntity {
  id: string;
  name: string;
  location?: GeoLocation;
  yelpBusinessDetails: any;
  usersReviews: UserReviewsEntity[];
}

export interface GeoLocation {
  type: string;
  coordinates: number[];
}
