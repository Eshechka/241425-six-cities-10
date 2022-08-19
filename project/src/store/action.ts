import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';

export const changeCity = createAction<{ city: City }>('city/change');

export const setOffers = createAction<{ offers: Offer[] }>('offers/set');

export const setFavoriteOffers = createAction<{ favoriteOffers: Offer[] }>('offers/setFavorite');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const setAuthorizationCheckedStatus = createAction<boolean>('data/setAuthorizationCheckedStatus');

export const setAuthorizationStatus = createAction<boolean>('data/setAuthorizationStatus');

export const setError = createAction<string | null>('data/setError');

export const setRoom = createAction<{ room: Offer }>('offers/setRoom');

export const setRoomsNearby = createAction<{ rooms: Offer[] }>('offers/setRoomsNearby');


