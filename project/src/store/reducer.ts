import { createReducer } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { addRoomReview, changeCity, setAuthorizationCheckedStatus, setAuthorizationStatus, setDataLoadedStatus, setError, setFavoriteOffers, setOffers, setRoom, setRoomReviews, setRoomsNearby } from './action';

const INIT_CITY_NAME = 'Paris';

type InitalState = {
  city: City,
  offers: Offer[],
  favoriteOffers: Offer[],
  isAuthorizationChecked: boolean,
  isDataLoaded: boolean,
  authorizationStatus: boolean,
  error: string | null,
  room: Offer | null,
  roomReviews: Review[] | [],
  roomsNearby: Offer[] | [],
}

const initialState: InitalState = {
  city: {
    name: INIT_CITY_NAME,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    },
  },
  offers: [],
  favoriteOffers: [],
  isAuthorizationChecked: false,
  isDataLoaded: false,
  authorizationStatus: false,
  error: null,
  room: null,
  roomReviews: [],
  roomsNearby: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { city } = action.payload;

      state.city = city;
    })
    .addCase(setOffers, (state, action) => {
      const { offers } = action.payload;

      state.offers = offers;
    })
    .addCase(setFavoriteOffers, (state, action) => {
      const { favoriteOffers } = action.payload;

      state.favoriteOffers = favoriteOffers;
    })
    .addCase(setAuthorizationCheckedStatus, (state, action) => {
      state.isAuthorizationChecked = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setRoom, (state, action) => {
      const { room } = action.payload;

      state.room = room;
    })
    .addCase(setRoomReviews, (state, action) => {
      const { reviews } = action.payload;

      state.roomReviews = reviews;
    })
    .addCase(addRoomReview, (state, action) => {
      const { reviews } = action.payload;

      state.roomReviews = reviews;
    })
    .addCase(setRoomsNearby, (state, action) => {
      const { rooms } = action.payload;

      state.roomsNearby = rooms;
    });
});

export { reducer };
