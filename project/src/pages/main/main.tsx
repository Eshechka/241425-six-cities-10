import cn from 'classnames';
import { useEffect, useState } from 'react';

import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import Sorting from '../../components/sorting/sorting';
import Tabs from '../../components/tabs/tabs';
import { AuthorizationStatus, CITIES, sortPriceAsc, sortPriceDesc, sortRatingDesc } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateOffers } from '../../store/action';

import { City } from '../../types/city';
import { Offer } from '../../types/offer';

type mainProps = {
  offers: Offer[],
  authStatus: AuthorizationStatus,
};

function Main(props: mainProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [currentCity, setCurrentCity] = useState(useAppSelector((state) => state.city));
  const initialCurrentCityOffers = useAppSelector((state) => state.offers).filter((offer) => offer.city.name === currentCity.name);
  const [currentCityOffers, setCurrentCityOffers] = useState(initialCurrentCityOffers);
  const [currentPoints, setCurrentPoints] = useState(currentCityOffers.map((offer) => ({location: offer.location, id: offer.id}) ));
  const [hoveredOffer, setHoveredOffer] = useState('');

  const onChangeTab = (city: City) => {
    setCurrentCity(city);
    dispatch(updateOffers( {offers: props.offers} ));
    setCurrentCityOffers(props.offers.filter((offer) => offer.city.name === city.name));
  };

  const onSort = (filterType: string) => {
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
  };

  const onHoverOffer = (id: string) => {

    if (id !== hoveredOffer) {
      setHoveredOffer(id);
    }
  };
  const onUnhoverOffer = (id: string) => {

    if (id === hoveredOffer) {
      setHoveredOffer('');
    }
  };


  useEffect(() => {
    setCurrentPoints(currentCityOffers.map((offer) => ({location: offer.city.location, id: offer.id})));
  }, [currentCityOffers]);

  return (
    <div className="page page--gray page--main">
      <Header authStatus={props.authStatus}/>

      <main className={cn('page__main page__main--index', {'page__main--index-empty': !!props.offers.length})}>
        <h1 className="visually-hidden">Cities</h1>

        <Tabs cities={CITIES} onChangeTab={onChangeTab}/>

        <div className="cities">
          {currentCityOffers.length ?
            (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{currentCityOffers.length} places to stay in {currentCity.name}</b>

                  <Sorting onSort={ onSort } />

                  <OfferList offers={currentCityOffers} onMouseOver={onHoverOffer} onMouseLeave={onUnhoverOffer} />

                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map city={currentCity} points={currentPoints} activePointId={hoveredOffer}/>
                  </section>
                </div>
              </div>
            ) :
            (
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </div>
            )}
        </div>
      </main>
    </div>);
}

export default Main;
