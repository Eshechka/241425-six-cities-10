import { formatDate } from '../../const';

import { Review } from '../../types/review';

type reviewItemProps = {
  review: Review,
};

function ReviewItem(props: reviewItemProps): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={props.review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {props.review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${props.review.rating * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {props.review.comment}
        </p>
        <time className="reviews__time" dateTime={props.review.date}>{formatDate(props.review.date)}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
