import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import OffersEmpty from '../../components/offers-empty/offers-empty';
import Sorting from '../../components/sorting/sorting';
import Spinner from '../../components/spinner/spinner';
import Tabs from '../../components/tabs/tabs';
import { AuthorizationStatus, CITIES, FilterType, sortPriceAsc, sortPriceDesc, sortRatingDesc } from '../../const';
import { fetchFavoriteOffersAction, fetchOffersAction } from '../../store/api-actions';
import { getCity, getFavoriteOffers, getLoadingDataStatus, getOffers } from '../../store/data-offers/selectors';
import { getAuthStatus } from '../../store/user-process/selectors';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { Point } from '../../types/point';


function Main(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthStatus);
  const isDataLoading = useAppSelector(getLoadingDataStatus);
  const offers = useAppSelector(getOffers);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const [currentCity, setCurrentCity] = useState(useAppSelector(getCity));

  const [initialCurrentCityOffers, setInitialCurrentCityOffers] = useState<Offer[]>([]);
  const [currentCityOffers, setCurrentCityOffers] = useState<Offer[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.Popular);
  const [currentPoints, setCurrentPoints] = useState<Point[] | []>([]);
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, []);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [authorizationStatus]);

  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === currentCity.name);
    setInitialCurrentCityOffers(filteredOffers);
    setCurrentCityOffers(filteredOffers);
  }, [offers, currentCity]);

  useEffect(() => {
    setCurrentPoints(currentCityOffers.map((offer) => ({location: offer.location, id: offer.id})));
  }, [currentCityOffers]);

  const onChangeTab = React.useCallback(
    (newCity: City) => {
      setCurrentCity(newCity);
      setFilterType(FilterType.Popular);
    },
    []
  );

  const onSort = React.useCallback(
    (newFilterType: FilterType) => {
      switch (newFilterType) {
        case FilterType.PriceLowToHigh:
          setCurrentCityOffers([...initialCurrentCityOffers].sort(sortPriceAsc));
          break;
        case FilterType.PriceHighToLow:
          setCurrentCityOffers([...initialCurrentCityOffers].sort(sortPriceDesc));
          break;
        case FilterType.TopRatedFirst:
          setCurrentCityOffers([...initialCurrentCityOffers].sort(sortRatingDesc));
          break;
        case FilterType.Popular:
        default:
          setCurrentCityOffers([...initialCurrentCityOffers]);
          break;
      }
      setFilterType(newFilterType);
    },
    [offers, initialCurrentCityOffers]
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

  if (isDataLoading) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="page page--gray page--main">
      {authorizationStatus === AuthorizationStatus.Auth ? <Header favoriteOffersCount={favoriteOffers.length} /> : <Header />}

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

                  <Sorting filterBy={filterType} onSort={onSort} />

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
