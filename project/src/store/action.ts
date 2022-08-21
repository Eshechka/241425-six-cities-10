import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

export const changeCity = createAction<{ city: City }>('city/change');

export const setOffers = createAction<{ offers: Offer[] }>('offers/set');

export const setFavoriteOffers = createAction<{ favoriteOffers: Offer[] }>('offers/setFavorite');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const setAuthorizationCheckedStatus = createAction<boolean>('data/setAuthorizationCheckedStatus');

export const setAuthorizationStatus = createAction<boolean>('data/setAuthorizationStatus');

export const setError = createAction<string | null>('data/setError');

export const setRoom = createAction<{ room: Offer }>('room/set');

export const setRoomReviews = createAction<{ reviews: Review[] }>('room/setReviews');

export const setRoomsNearby = createAction<{ rooms: Offer[] }>('room/setRoomsNearby');


