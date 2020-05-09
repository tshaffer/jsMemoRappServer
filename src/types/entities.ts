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
  yelpBusinessDetails: any;
  usersReviews: UserReviewsEntity[];
  location?: GeoLocation;
}

export interface GeoLocation {
  type: string;
  coordinates: number[];
}

export interface YelpRestaurantCategory {
  alias: string;
  title: string;
}

export interface LatLongPoint {
  latitude: number;
  longitude: number;
}

export interface YelpRestaurant {
  id: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  review_count: number;
  categories: YelpRestaurantCategory[];
  rating: number;
  coordinates: LatLongPoint;
  transactions: string[];
  price: string;
  location: {
    // address1, address2, address3, city, zip_code, country, state
    display_address: string[];
  };
  phone: string;
  display_phone: string;
  distance: number;
}
