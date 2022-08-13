import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute } from '../const';
import { setDataLoadedStatus, setOffers } from './action';
import { Offer } from '../types/offer.js';

export const fetchHotelsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchHotels',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Hotels);

    dispatch(setDataLoadedStatus(true));
    dispatch(setOffers({ offers: data }));
  },
);
