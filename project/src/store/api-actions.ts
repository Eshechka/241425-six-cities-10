import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute } from '../const';
import { Offer } from '../types/offer';
import { AuthData } from '../types/auth';
import { UserData } from '../types/user';
import { dropToken, saveToken } from '../services/token';
import { AddedReview, Review } from '../types/review.js';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetch',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Hotels);
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'offers/fetchFavorite',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  },
);


export const fetchRoomAction = createAsyncThunk<Offer, string | undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'room/fetch',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Room}${_arg}`);
    return data;
  },
);

export const fetchRoomsNearbyAction = createAsyncThunk<Offer[], string | undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'room/fetchRoomsNearby',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Room}${_arg}/nearby`);
    return data;
  },
);

export const fetchRoomReviewsAction = createAsyncThunk<Review[], string | undefined, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'room/fetchReviews',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}${_arg}`);
    return data;
  },
);

export const addRoomReviewAction = createAsyncThunk<Review[], { id: string, review: AddedReview }, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'room/addReview',
  async ({ id, review: { comment, rating } }, { dispatch, extra: api }) => {
    const { data } = await api.post<Review[]>(`${APIRoute.Comments}${id}`, { comment, rating });
    return data;
  },
);

export const changeRoomFavoriteAction = createAsyncThunk<Offer, { id: string | undefined, status: number }, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'offers/changeFavorites',
  async ({ id, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);
    return data;
  },
);


export const checkLoginAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkLogin',
  async (_arg, { dispatch, extra: api }) => {
    await api.get(APIRoute.Login);
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
  },
);
