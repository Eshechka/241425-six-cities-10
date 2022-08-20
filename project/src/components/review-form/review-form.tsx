import { ChangeEvent, useState } from 'react';
import { reviewValidation } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchAddRoomReviewAction } from '../../store/api-actions';

type ReviewFormProps = {
  roomId: string,
}

function ReviewForm(props: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const initialformData = {
    rating: 0,
    comment: '',
  };

  const [formData, setFormData] = useState(initialformData);
  const [isCorrectFormData, setIsCorrectFormData] = useState(false);
  const [isCorrectRating, setIsCorrectRating] = useState(false);
  const [isCorrectComment, setIsCorrectComment] = useState(false);


  const ratingChangeHandle = (e: ChangeEvent<HTMLInputElement>, val: string): void => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: val ? val : value});

    const isCorrect = !!(val && +val > reviewValidation.ratingGt);
    setIsCorrectRating(isCorrect);
    setIsCorrectFormData(isCorrectComment && isCorrect);
  };
  const commentChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const comment = e.target.value;
    setFormData({...formData, comment: comment});

    const isCorrect = !!(comment && comment.length >= reviewValidation.minCommentLength);
    setIsCorrectComment(isCorrect);
    setIsCorrectFormData(isCorrectRating && isCorrect);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchAddRoomReviewAction({id: props.roomId, review: formData}));
    setFormData(initialformData);
  };

  return (
    <form className="reviews__form form"
      action=""
      method="post"
      onSubmit={onSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" onChange={(e) => ratingChangeHandle(e, '5')} value={formData.rating} id="5-stars" type="radio"/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" onChange={(e) => ratingChangeHandle(e, '4')} value={formData.rating} id="4-stars" type="radio"/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" onChange={(e) => ratingChangeHandle(e, '3')} value={formData.rating} id="3-stars" type="radio"/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" onChange={(e) => ratingChangeHandle(e, '2')} value={formData.rating} id="2-stars" type="radio"/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" onChange={(e) => ratingChangeHandle(e, '1')} value={formData.rating} id="1-star" type="radio"/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={commentChangeHandle} value={formData.comment} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isCorrectFormData}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
