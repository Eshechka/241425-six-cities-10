
import { store } from '../store/index.js';

import { AuthorizationStatus } from '../const';
import { Offer } from './offer.js';
import { Review } from './review.js';
import { City } from './city.js';
import { UserData } from './user.js';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userInfo: UserData | null,
};
export type DataOffers = {
  city: City,
  offers: Offer[],
  favoriteOffers: Offer[],
  isDataLoading: boolean,
};
export type DataRoom = {
  room: Offer | null,
  roomReviews: Review[] | [],
  roomsNearby: Offer[] | [],
  isDataLoading: boolean,
  notFoundError: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
