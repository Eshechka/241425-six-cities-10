import Header from '../../components/header/header';

import OfferItem from '../../components/offer-item/offer-item';

import { AuthorizationStatus, OfferItemViews } from '../../const';

import { Offer } from '../../types/offer';

type favoritesProps = {
  offers: Offer[],
  authStatus: AuthorizationStatus,
};

function Favorites(props: favoritesProps): JSX.Element {
  const cities = new Set<string>();
  props.offers.map((offer) => cities.add(offer.city.name));
  const favoriteCities: string[] = Array.from(cities.values());

  return (
    <div className="page">
      <Header authStatus={props.authStatus}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {favoriteCities.map((city: string) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  {props.offers
                    .filter((favoriteOffer : Offer) => favoriteOffer.city.name === city)
                    .map((favoriteOffer : Offer) => (
                      <OfferItem
                        key={favoriteOffer.id}
                        offer={favoriteOffer}
                        view={OfferItemViews.Favorite}
                      />
                    )
                    )}
                </li>)
              )}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>);
}

export default Favorites;
