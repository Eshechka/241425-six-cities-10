import { Offer } from '../../types/offer';
import OfferItem from '../offer-item/offer-item';

type offerItemNearProps = {
  offer: Offer,
};

function OfferItemNear(props: offerItemNearProps): JSX.Element {
  return (
    <OfferItem
      articleClassName='near-places__card'
      imgWrapperClassName='near-places__image-wrapper'
      {...props}
    />
  );
}

export default OfferItemNear;
