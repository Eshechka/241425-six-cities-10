import { useState } from 'react';
import { Offer } from '../../types/offer';

import OfferItemCity from '../offer-item-city/offer-item-city';

type offerListProps = {
  offers: Offer[]
};

function OfferList(props: offerListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState('');

  const handleMouseOver = (id: string) => {
    if (id && id !== activeOffer) {
      setActiveOffer(id);
    }
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {props.offers && props.offers.map((offer) =>
        (
          <OfferItemCity
            key={offer.id}
            offer={offer}
            onMouseOver={() => handleMouseOver(offer.id)}
          />)
      )}
    </div>
  );
}

export default OfferList;
