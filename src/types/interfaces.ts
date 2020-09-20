export interface FilterSpec {
  reviewers?: string[];
  tags?: string[];
  location?: GeoLocationSpec;
  // reviews: wouldReturn
  // visitReviews: rating
  // aggregate rating
}

export interface GeoLocationSpec {
  coordinates: number[];  // Array of Longitude, then Latitude numbers
  maxDistance: number;
}
