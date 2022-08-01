import { Offer } from '../../types/offer';
import OfferItem from '../offer-item/offer-item';

type offerItemFavoriteProps = {
  offer: Offer,
};

function OfferItemFavorite(props: offerItemFavoriteProps): JSX.Element {
  return (
    <OfferItem
      articleClassName='favorites__card'
      imgWrapperClassName='favorites__image-wrapper'
      cardInfoClassName='favorites__card-info'
      imgWidth={150}
      imgHeight={100}
      {...props}
    />
  );
}

export default OfferItemFavorite;
