import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataOffers } from '../../types/state';
import { changeRoomFavoriteAction, fetchFavoriteOffersAction, fetchOffersAction } from '../api-actions';

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
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers = [];
        state.isDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(changeRoomFavoriteAction.fulfilled, (state, action) => {
        const changedOffer = action.payload;

        if (changedOffer.isFavorite === true) {
          state.favoriteOffers = [...state.favoriteOffers, changedOffer];
        } else {
          state.favoriteOffers = [...state.favoriteOffers.filter((item) => item.id !== changedOffer.id)];
        }
      });
  }
});


export const { changeCity } = dataOffers.actions;
