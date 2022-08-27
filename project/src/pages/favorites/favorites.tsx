import cn from 'classnames';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import OfferItemFavorite from '../../components/offer-item-favorite/offer-item-favorite';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import Spinner from '../../components/spinner/spinner';
import { AppRoute, CITIES } from '../../const';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { getFavoriteOffers, getLoadingDataStatus } from '../../store/data-offers/selectors';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { changeCity } from '../../store/data-offers/data-offers';


function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isDataLoading = useAppSelector(getLoadingDataStatus);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const cities = new Set<string>();

  for (const offerItem of favoriteOffers) {
    if (cities.size === CITIES.length) {
      break;
    }
    cities.add(offerItem.city.name);
  }

  const favoriteCities: City[] = CITIES.filter((city) => Array.from(cities.values()).includes(city.name));

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, []);


  if (isDataLoading === true) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className={cn('page', {'page--favorites-empty': favoriteOffers.length > 0})}>
      <Header favoriteOffersCount={favoriteOffers.length}/>

      {favoriteOffers.length > 0 ?
        (
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">

                  {favoriteCities.map((city) => (
                    <li className="favorites__locations-items" key={city.name}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(changeCity({city}));
                              navigate(AppRoute.Root);
                            }}
                          >
                            <span>{city.name}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {favoriteOffers
                          .filter((favoriteOffer : Offer) => favoriteOffer.city.name === city.name)
                          .map((favoriteOffer : Offer) => (
                            <OfferItemFavorite
                              key={favoriteOffer.id}
                              offer={favoriteOffer}
                            />
                          )
                          )}
                      </div>
                    </li>)
                  )}
                </ul>
              </section>
            </div>
          </main>
        )
        : <FavoritesEmpty />}

      <footer className="footer container">
        <a className="footer__logo-link" href={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>);
}

export default Favorites;
