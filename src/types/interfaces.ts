export interface FilterSpec {
  reviewers?: string[];
  tags?: string[];
  location?: GeoLocationSpec;
  // reviews: wouldReturn
  // visitReviews: rating
  // aggregate rating
}

export interface GeoLocationSpec {
  coordinates: number[];
  maxDistance: number;
}
