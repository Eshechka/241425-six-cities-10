
export type Review = {
  id: string;
  rating: number;
  comment: string;
  date: string;
  user: {
    id: number
    isPro: boolean
    name: string;
    avatarUrl: string;
  }
};

export type AddedReview = {
  comment: string;
  rating: number;
}
