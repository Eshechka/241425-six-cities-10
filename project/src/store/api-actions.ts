import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { setAuthorizationStatus, setDataLoadedStatus, setError, setFavoriteOffers, setOffers } from './action';
import { Offer } from '../types/offer';
import { AuthData } from '../types/auth';
import { UserData } from '../types/user';
import { saveToken } from '../services/token';
import { store } from './index';

export const setOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/set',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Hotels);

    dispatch(setDataLoadedStatus(true));
    dispatch(setOffers({ offers: data }));
  },
);

export const setFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/setFavorite',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Hotels);

    dispatch(setFavoriteOffers({ favoriteOffers: data }));
  },
);

export const checkLoginAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/checkLogin',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthorizationStatus(true));
    } catch {
      dispatch(setAuthorizationStatus(false));
    }
  },
);

export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });

    saveToken(token);
    dispatch(setAuthorizationStatus(true));
  },
);

