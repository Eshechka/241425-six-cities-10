import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataOffers } from '../../types/state';
import { fetchOffersAction } from '../api-actions';

const INIT_CITY_NAME = 'Paris';

const initialState: DataOffers = {
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
  isDataLoading: false,
};

export const dataOffers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setFavoriteOffers: (state, action) => {
      const { favoriteOffers } = action.payload;
      state.favoriteOffers = favoriteOffers;
    },
    changeCity: (state, action) => {
      const { city } = action.payload;
      state.city = city;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      });
  }
});


export const { setFavoriteOffers, changeCity } = dataOffers.actions;
