import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute, OfferItemViews } from '../../const';

import { Offer } from '../../types/offer';

type offerItemProps = {
  offer: Offer,
  onMouseOver?: () => void,
  view?: OfferItemViews,
};

function OfferItem(props: offerItemProps): JSX.Element {
  return (
    <article className={cn('place-card', {'favorites__card': props.view === 'favorite', 'cities__card': props.view === 'standart',})} onMouseOver={props.onMouseOver}>
      {props.offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> :
        null}
      <div className={cn('place-card__image-wrapper', {'favorites__image-wrapper': props.view === 'favorite', 'cities__image-wrapper': props.view === 'standart',})}>
        <a href="#">
          <img className="place-card__image" src={props.offer.src} width={props.view === 'favorite' ? 150 : 260} height={props.view === 'favorite' ? 110 : 200} alt="Place image"/>
        </a>
      </div>
      <div className={cn('place-card__info', {'favorites__card-info': props.view === 'favorite'})}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={props.offer.isFavorite ? 'place-card__bookmark-button button place-card__bookmark-button--active' : 'place-card__bookmark-button button'} type="button">
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
          <Link to={`${AppRoute.Room}/${props.offer.id}`}>{props.offer.description}</Link>
        </h2>
        <p className="place-card__type">{props.offer.type}</p>
      </div>
    </article>
  );
}

export default OfferItem;
