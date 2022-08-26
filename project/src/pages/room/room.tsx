import style from './style.module.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { fetchRoomAction, fetchRoomsNearbyAction, fetchRoomReviewsAction, changeRoomFavoriteAction } from '../../store/api-actions';

import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OfferItemNear from '../../components/offer-item-near/offer-item-near';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Spinner from '../../components/spinner/spinner';
import { getAuthStatus } from '../../store/user-process/selectors';
import { getLoadingDataRoomStatus, getNotFoundStatus, getRoom, getRoomReviews, getRoomsNearby } from '../../store/data-room/selectors';
import { setNotFoundStatus } from '../../store/data-room/data-room';


function Room(): JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const room = useAppSelector(getRoom);
  const authorizationStatus = useAppSelector(getAuthStatus);
  const roomsNearby = useAppSelector(getRoomsNearby);
  const roomReviews = useAppSelector(getRoomReviews);
  const error = useAppSelector(getNotFoundStatus);
  const isRoomDataLoading = useAppSelector(getLoadingDataRoomStatus);
  const [isActiveBookmark, setIsActiveBookmark] = useState(room?.isFavorite);
  const [reviews, setReviews] = useState(roomReviews);


  const navigate = useNavigate();


  const toggleBookmark = () => {
    const status = isActiveBookmark ? 0 : 1;
    dispatch(changeRoomFavoriteAction({id, status: status}));
    setIsActiveBookmark((prev) => !prev);
  };


  useEffect(() => {
    if (roomReviews && roomReviews.length > 0) {
      setReviews(roomReviews.slice(0, 10));
    }
  }, [roomReviews]);

  useEffect(() => {
    setIsActiveBookmark(room?.isFavorite);
  }, [room]);

  useEffect(() => {
    if (error === true) {
      navigate(AppRoute.NotFound);
      dispatch(setNotFoundStatus(false));
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchRoomAction(id));
    dispatch(fetchRoomReviewsAction(id));
    dispatch(fetchRoomsNearbyAction(id));
  }, [id]);

  if (isRoomDataLoading || !roomReviews) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {room && room.images && room.images.map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            {room &&
            <div className="property__wrapper">
              {room.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {room.title}
                </h1>
                <button
                  className="property__bookmark-button property__bookmark-button--active button"
                  type="button"
                  onClick={toggleBookmark}
                >
                  <svg className={['property__bookmark-icon', isActiveBookmark ? style.active_bookmark : ''].join(' ')} width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{isActiveBookmark ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${room.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{room.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{room.type}</li>
                {room.bedrooms ? (<li className="property__feature property__feature--bedrooms">{`${room.bedrooms} Bedrooms`}</li>) : null}
                {room.maxAdults ? (<li className="property__feature property__feature--adults">{`Max ${room.maxAdults} adults`}</li>) : null}
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{room.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {room && room.goods && room.goods.map((feature) => (
                    <li className="property__inside-item" key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    {room.host.avatarUrl && <img className="property__avatar user__avatar" src={room.host.avatarUrl} width="74" height="74" alt="Host avatar"/>}
                  </div>
                  <span className="property__user-name">
                    {room.host.name}
                  </span>
                  <span className="property__user-status">
                    {room.host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {room.title}
                  </p>
                  <p className="property__text">
                    {room.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                {reviews && <ReviewList reviews={reviews}/>}
                {authorizationStatus === AuthorizationStatus.Auth && id && <ReviewForm roomId={id} />}
              </section>
            </div>}
          </div>
          <section className="property__map map">
            {room && <Map city={room.city} points={[{id: room.id, location: room.location}, ...roomsNearby.map((nearRoom) => ({location: nearRoom.location, id: nearRoom.id}) )]}/>}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {roomsNearby.map((offer) =>
                (<OfferItemNear key={offer.id} offer={offer} />)
              )}
            </div>
          </section>
        </div>
      </main>
    </div>);
}

export default Room;
