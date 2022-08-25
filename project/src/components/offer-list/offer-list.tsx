import React from 'react';
import { Offer } from '../../types/offer';

import OfferItemCity from '../offer-item-city/offer-item-city';

type offerListProps = {
  offers: Offer[],
  onMouseOver: (id: string) => void,
  onMouseLeave: (id: string) => void,
};

function OfferList(props: offerListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {props.offers && props.offers.map((offer) =>
        (
          <OfferItemCity
            key={offer.id}
            offer={offer}
            onMouseOver={() => props.onMouseOver(offer.id)}
            onMouseLeave={() => props.onMouseLeave(offer.id)}
          />)
      )}
    </div>
  );
}

export default React.memo(OfferList);
