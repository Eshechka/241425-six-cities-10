import { useParams } from 'react-router-dom';

import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OfferItemNear from '../../components/offer-item-near/offer-item-near';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';

import { AuthorizationStatus } from '../../const';

import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

type roomProps = {
  offers: Offer[],
  reviews: Review[],
  authStatus: AuthorizationStatus,
}

function Room(props: roomProps): JSX.Element {
  const { id } = useParams();

  const room = props.offers.filter((offer) => offer.id === id)[0];
  const nearRooms = props.offers.slice(0, 3);
  const roomReviews = props.reviews.filter((review: Review) => review.offerId === id).slice(0, 10);

  return (
    <div className="page">
      <Header authStatus={props.authStatus}/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {room && room.images && room.images.map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {room?.isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : null}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {room?.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{room?.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${room?.rating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{room?.rating ? (room?.rating * 5 / 100).toFixed(1) : ''}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{room?.type}</li>
                {room?.bedrooms ? (<li className="property__feature property__feature--bedrooms">{`${room?.bedrooms} Bedrooms`}</li>) : null}
                {room?.maxAdults ? (<li className="property__feature property__feature--adults">{`Max ${room?.maxAdults} adults`}</li>) : null}
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{room?.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {room && room.goods && room?.goods.map((feature) => (
                    <li className="property__inside-item" key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    {room?.host?.avatarUrl && <img className="property__avatar user__avatar" src={room?.host?.avatarUrl} width="74" height="74" alt="Host avatar"/>}
                  </div>
                  <span className="property__user-name">
                    {room?.host?.name}
                  </span>
                  <span className="property__user-status">
                    {room?.host?.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {room?.title}
                  </p>
                  <p className="property__text">
                    {room?.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewList reviews={roomReviews}/>
                {props.authStatus === AuthorizationStatus.Auth ? <ReviewForm/> : null}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map city={room?.city} points={[{id: room.id, location: room.location}, ...nearRooms.map((nearRoom) => ({location: nearRoom.location, id: nearRoom.id}) )]}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearRooms.map((offer) =>
                (
                  <OfferItemNear
                    key={offer.id}
                    offer={offer}
                  />)
              )}
            </div>
          </section>
        </div>
      </main>
    </div>);
}

export default Room;
