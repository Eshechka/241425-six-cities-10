import cn from 'classnames';
import { useEffect, useState } from 'react';

import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import Tabs from '../../components/tabs/tabs';
import { AuthorizationStatus, CITIES, FilterType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffers } from '../../store/action';
import { City } from '../../types/city';

import { Offer } from '../../types/offer';

type mainProps = {
  offers: Offer[],
  authStatus: AuthorizationStatus,
};

function Main(props: mainProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [currentCity, setCurrentCity] = useState(useAppSelector((state) => state.city));
  const [currentCityOffers, setCurrentCityOffers] = useState(useAppSelector((state) => state.offers).filter((offer) => offer.city.name === currentCity.name));
  const [currentPoints, setCurrentPoints] = useState(currentCityOffers.map((offer) => offer.city.location));
  const [currentFilter, serCurrentFilter] = useState(FilterType[0]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const onChangeTab = (city: City) => {
    setCurrentCity(city);
    dispatch(getOffers( {offers: props.offers} ));
    setCurrentCityOffers(props.offers.filter((offer) => offer.city.name === city.name));
  };


  useEffect(() => {
    setCurrentPoints(currentCityOffers.map((offer) => offer.city.location));
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
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by </span>
                    <span
                      className="places__sorting-type"
                      tabIndex={0}
                      onClick={() => setIsOpenFilter(!isOpenFilter)}
                    >
                      {currentFilter}
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select"></use>
                      </svg>
                    </span>
                    <ul className={cn('places__options places__options--custom', {'places__options--opened': isOpenFilter})}>
                      {
                        FilterType.map((filterType) => (
                          <li
                            key={filterType}
                            className={cn('places__option', {'places__option--active':  currentFilter === filterType})}
                            tabIndex={0}
                            onClick={
                              () => {
                                serCurrentFilter(filterType);
                                setIsOpenFilter(false);
                              }
                            }
                          >
                            {filterType}
                          </li>
                        ))
                      }
                    </ul>
                  </form>

                  <OfferList offers={currentCityOffers} />

                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map city={currentCity} points={currentPoints}/>
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
