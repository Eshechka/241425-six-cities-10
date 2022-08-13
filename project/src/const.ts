import { Offer } from './types/offer';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
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
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 20
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 20
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 20
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 20
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 20
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 20
    }
  },
];

export const sortPriceDesc = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;
export const sortPriceAsc = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;
export const sortRatingDesc = (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating;

export enum APIRoute {
  Hotels = '/hotels',
  Login = '/login',
  Favorite = '/favorite',
}

export enum headerView {
  WAuth = 'with-auth',
  WOAuth = 'without-auth',
}

export const TIMEOUT_SHOW_ERROR = 2000;
