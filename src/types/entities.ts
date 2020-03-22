export interface UserEntity {
  userName: string;
  password: string;
  email: string;
}

export interface TagEntity {
  value: string;
}

export interface VisitReviewEntity {
  date: Date;
  comments: string;
  rating: number;
}

export interface UserReviewsEntity {
  userName: string;
  wouldReturn: boolean;
  userTags: string[];
  visitReviews: VisitReviewEntity[];
}

export interface RestaurantEntity {
  restaurantName: string;
  yelpBusinessDetails: any;
  tags: TagEntity[];
  usersReviews: UserReviewsEntity[];
}
