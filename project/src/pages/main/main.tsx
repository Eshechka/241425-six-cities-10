import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import OffersEmpty from '../../components/offers-empty/offers-empty';
import Sorting from '../../components/sorting/sorting';
import Spinner from '../../components/spinner/spinner';
import Tabs from '../../components/tabs/tabs';

import { AuthorizationStatus, CITIES, sortPriceAsc, sortPriceDesc, sortRatingDesc } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction, fetchOffersAction } from '../../store/api-actions';
import { getCity, getFavoriteOffers, getLoadingDataStatus, getOffers } from '../../store/data-offers/selectors';
import { getAuthStatus } from '../../store/user-process/selectors';


import { City } from '../../types/city';
import { Offer } from '../../types/offer';


function Main(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthStatus);
  const isDataLoading = useAppSelector(getLoadingDataStatus);
  const offers = useAppSelector(getOffers);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const [currentCity, setCurrentCity] = useState(useAppSelector(getCity));

  let initialCurrentCityOffers: Offer[] = [];
  const [currentCityOffers, setCurrentCityOffers] = useState(initialCurrentCityOffers);
  const [currentPoints, setCurrentPoints] = useState(currentCityOffers.map((offer) => ({location: offer.location, id: offer.id}) ));
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  const [favoriteOffersCount, setFavoriteOffersCount] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, []);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [authorizationStatus]);

  useEffect(() => {
    initialCurrentCityOffers = offers.filter((offer) => offer.city.name === currentCity.name);
    setCurrentCityOffers(initialCurrentCityOffers);
  }, [offers, currentCity]);

  useEffect(() => {
    setFavoriteOffersCount(favoriteOffers.length);
  }, [favoriteOffers]);

  useEffect(() => {
    setCurrentPoints(currentCityOffers.map((offer) => ({location: offer.location, id: offer.id})));
  }, [currentCityOffers]);

  const onChangeTab = React.useCallback(
    (newCity: City) => {
      setCurrentCity(newCity);
      setCurrentCityOffers(offers.filter((offer) => offer.city.name === newCity.name));
    },
    []
  );

  const onSort = React.useCallback(
    (filterType: string) => {
      switch (filterType) {
        case 'Price: low to high':
          setCurrentCityOffers(initialCurrentCityOffers.sort(sortPriceAsc));
          break;
        case 'Price: high to low':
          setCurrentCityOffers(initialCurrentCityOffers.sort(sortPriceDesc));
          break;
        case 'Top rated first':
          setCurrentCityOffers(initialCurrentCityOffers.sort(sortRatingDesc));
          break;
        case 'Popular':
        default:
          setCurrentCityOffers(initialCurrentCityOffers);
          break;
      }
    },
    []
  );

  const onHoverOffer = React.useCallback(
    (id: string) => {
      if (id !== hoveredOfferId) {
        setHoveredOfferId(id);
      }
    },
    []
  );
  const onUnhoverOffer = React.useCallback(
    (id: string) => {
      if (id === hoveredOfferId) {
        setHoveredOfferId('');
      }
    },
    []
  );


  if (isDataLoading === true) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="page page--gray page--main">
      {(authorizationStatus === AuthorizationStatus.Auth && favoriteOffersCount !== null) ? <Header favoriteOffersCount={favoriteOffersCount} /> : <Header />}

      <main className={cn('page__main page__main--index', {'page__main--index-empty': !!offers.length})}>
        <h1 className="visually-hidden">Cities</h1>

        <Tabs cities={CITIES} onChangeTab={onChangeTab}/>

        <div className="cities">
          {currentCityOffers.length ?
            (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{currentCityOffers.length} places to stay in {currentCity.name}</b>

                  <Sorting onSort={onSort} />

                  <OfferList offers={currentCityOffers} onMouseOver={onHoverOffer} onMouseLeave={onUnhoverOffer} />

                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map city={currentCity} points={currentPoints} activePointId={hoveredOfferId}/>
                  </section>
                </div>
              </div>
            ) : <OffersEmpty city={currentCity}/>}
        </div>
      </main>
    </div>);
}

export default Main;
