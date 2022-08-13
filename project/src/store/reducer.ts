import { createReducer } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { changeCity, setAuthorizationStatus, setDataLoadedStatus, setError, setFavoriteOffers, setOffers } from './action';

const INIT_CITY_NAME = 'Paris';

type InitalState = {
  city: City,
  offers: Offer[],
  favoriteOffers: Offer[],
  isDataLoaded: boolean,
  authorizationStatus: boolean,
  error: string | null,
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
  isDataLoaded: false,
  authorizationStatus: false,
  error: null,
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
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
