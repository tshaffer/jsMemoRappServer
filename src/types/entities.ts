export interface UserEntity {
  userName: string;
  password: string;
  email: string;
}

export interface TagEntity {
  value: string;
}

// export interface UserReviewEntity {}

export interface RestaurantEntity {
  restaurantName: string;
  yelpBusinessDetails: any;
  tags: TagEntity[];
  userReviews: any[];
}
