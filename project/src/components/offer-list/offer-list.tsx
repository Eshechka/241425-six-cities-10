import { useState } from 'react';
import { OfferItemViews } from '../../const';
import { Offer } from '../../types/offer';

import OfferItem from '../offer-item/offer-item';

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
          <OfferItem
            key={offer.id}
            offer={offer}
            view={OfferItemViews.Standart}
            onMouseOver={() => handleMouseOver(offer.id)}
          />)
      )}
    </div>
  );
}

export default OfferList;
