import { createReducer } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
// import { offers as mockOffers } from '../mocks/offers';
import { changeCity, setDataLoadedStatus, setOffers } from './action';

const INIT_CITY_NAME = 'Paris';

type InitalState = {
  city: City,
  offers: Offer[],
  isDataLoaded: boolean,
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
  isDataLoaded: false,
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
    .addCase(setDataLoadedStatus, (state, action) => {
      const isDataLoaded = action.payload;

      state.isDataLoaded = isDataLoaded;
    });
});

export { reducer };
