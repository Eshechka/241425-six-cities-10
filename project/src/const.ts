import { Offer } from './types/offer';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
}

export enum AuthorizationStatus {
  NoAuth = 'NOAUTH',
  Auth = 'AUTH',
}

export const FilterType = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const formatDate = (data: string): string => {
  const formatData = new Date(data);

  return `${MONTHS[formatData.getMonth()]} ${formatData.getFullYear()}`;
};

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
];

export const sortPriceDesc = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;
export const sortPriceAsc = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;
export const sortRatingDesc = (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating;
