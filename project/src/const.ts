import { Offer } from './types/offer';
import { Review } from './types/review';


export enum APIRoute {
  Hotels = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Room = '/hotels/',
  Comments = '/comments/'
}

export enum headerView {
  WAuth = 'with-auth',
  WOAuth = 'without-auth',
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  NotFound = '/404',
}

export enum FilterType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum ErrorMessages {
  Code404 = 'Request failed with status code 404',
}

export enum NameSpace {
  Data = 'DATA',
  Room = 'ROOM',
  Offers = 'OFFERS',
  User = 'USER',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export const FilterTypes = [
  FilterType.Popular,
  FilterType.PriceLowToHigh,
  FilterType.PriceHighToLow,
  FilterType.TopRatedFirst,
];

export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
];

export const reviewValidation = {
  ratingGt: 0,
  minCommentLength: 50,
  maxCommentLength: 300,
};

export const authValidation = {
  login: {
    regexp: /\S+@\S+\.\S+/,
  },
  password: {
    regexp: /([0-9].*[a-z])|([a-z].*[0-9])/,
  },
};

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatDate = (data: string): string => {
  const formatData = new Date(data);

  return `${MONTHS[formatData.getMonth()]} ${formatData.getFullYear()}`;
};

export const sortPriceDesc = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;

export const sortPriceAsc = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;

export const sortRatingDesc = (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating;

export const sortReviewsDesc = (reviewA: Review, reviewB: Review) => Date.parse(reviewB.date) - Date.parse(reviewA.date);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

