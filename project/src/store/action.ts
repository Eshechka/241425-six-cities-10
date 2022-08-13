import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';

export const changeCity = createAction<{ city: City }>('city/change');

export const setOffers = createAction<{ offers: Offer[] }>('offers/set');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
