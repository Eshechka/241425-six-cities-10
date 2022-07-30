import { Review } from '../../types/review';

import ReviewItem from '../review-item/review-item';


type reviewListProps = {
  reviews: Review[]
};

function ReviewList(props: reviewListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{props.reviews.length}</span></h2>
      <ul className="reviews__list">
        {props.reviews.map((review: Review) => (
          <ReviewItem key={review.id} review={review}/>
        ))}
      </ul>
    </>
  );
}

export default ReviewList;
