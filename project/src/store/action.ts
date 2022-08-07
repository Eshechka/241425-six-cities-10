import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';

export const changeCity = createAction<{ city: City }>('city/change');

export const updateOffers = createAction<{ offers: Offer[] }>('offers/get');
