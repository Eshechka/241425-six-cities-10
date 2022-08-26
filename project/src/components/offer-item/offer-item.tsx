import cn from 'classnames';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeRoomFavoriteAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/user-process/selectors';

import { Offer } from '../../types/offer';

type offerItemProps = {
  offer: Offer,
  onMouseOver?: () => void,
  onMouseLeave?: () => void,
  articleClassName?: string,
  imgWrapperClassName?: string,
  cardInfoClassName? : string,
  imgWidth?: number,
  imgHeight?: number,
};

function OfferItem(props: offerItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(getAuthStatus);
  const [isActiveBookmark, setIsActiveBookmark] = useState(props.offer.isFavorite);

  const toggleBookmark = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      const status = isActiveBookmark ? 0 : 1;
      dispatch(changeRoomFavoriteAction({id: props.offer.id, status: status}));
      setIsActiveBookmark((prev) => !prev);
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <article
      className={['place-card', props.articleClassName].join(' ')}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
    >
      {props.offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={['place-card__image-wrapper', props.imgWrapperClassName].join(' ')}>

        <Link to={`${AppRoute.Room}/${props.offer.id}`}>
          <img className="place-card__image"
            src={props.offer.previewImage}
            width={props.imgWidth || 260}
            height={props.imgHeight || 200}
            alt="Place"
          />
        </Link>
      </div>
      <div className={['place-card__info', props.cardInfoClassName].join(' ')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={cn('place-card__bookmark-button button', {'place-card__bookmark-button--active': isActiveBookmark})}
            type="button"
            onClick={toggleBookmark}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{props.offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${props.offer.rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${props.offer.id}`}>{props.offer.title}</Link>
        </h2>
        <p className="place-card__type">{props.offer.type}</p>
      </div>
    </article>
  );
}

export default OfferItem;
