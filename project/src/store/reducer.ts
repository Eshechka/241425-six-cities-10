import { createReducer } from '@reduxjs/toolkit';
import { offers as mockOffers } from '../mocks/offers';
import { changeCity, updateOffers } from './action';

const INIT_CITY_NAME = 'Paris';

const initialState = {
  city: {
    name: INIT_CITY_NAME,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    },
  },
  offers: mockOffers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { city } = action.payload;

      state.city = city;
    })
    .addCase(updateOffers, (state, action) => {
      const { offers } = action.payload;

      state.offers = offers;
    });
});

export { reducer };
