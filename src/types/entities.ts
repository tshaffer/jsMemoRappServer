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

export interface MemoRappLocation {
  coordinates: {
    latitude: number,
    longitude: number,
  };
}

export interface RestaurantEntity {
  id: string;
  name: string;
  yelpBusinessDetails: any;
  usersReviews: UserReviewsEntity[];
  // location?: GeoLocation;
  location?: MemoRappLocation;
}

export interface GeoLocation {
  type: string;
  coordinates: number[];
}
