
import { Offer } from '../../types/offer';
import OfferItem from '../offer-item/offer-item';

type offerItemCityProps = {
  offer: Offer,
  onMouseOver?: () => void,
  onMouseLeave?: () => void,
};

function OfferItemCity(props: offerItemCityProps): JSX.Element {
  return (
    <OfferItem
      articleClassName='cities__card'
      imgWrapperClassName='cities__image-wrapper'
      {...props}
    />
  );
}

export default OfferItemCity;
