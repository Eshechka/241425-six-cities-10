import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { setAuthorizationCheckedStatus, setAuthorizationStatus, setDataLoadedStatus, setError, setFavoriteOffers, setOffers, setRoom, setRoomsNearby } from './action';
import { Offer } from '../types/offer';
import { AuthData } from '../types/auth';
import { UserData } from '../types/user';
import { dropToken, saveToken } from '../services/token';
import { store } from './index';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetch',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Hotels);

    dispatch(setOffers({ offers: data }));
    dispatch(setDataLoadedStatus(true));
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchFavorite',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);

    dispatch(setFavoriteOffers({ favoriteOffers: data }));
  },
);

export const fetchRoomAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'offers/fetchRoom',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Room}${_arg}`);

    dispatch(setRoom({ room: data }));
  },
);

export const fetchRoomsNearbyAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'offers/fetchRoomsNearby',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Room}${_arg}/nearby`);

    dispatch(setRoomsNearby({ rooms: data }));
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
      dispatch(setAuthorizationCheckedStatus(true));
    } catch {
      dispatch(setAuthorizationStatus(false));
      dispatch(setAuthorizationCheckedStatus(true));
      dispatch(setError(null));
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

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(false));
  },
);
