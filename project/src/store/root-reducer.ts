import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataOffers } from './data-offers/data-offers';
import { dataRoom } from './data-room/data-room';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: dataOffers.reducer,
  [NameSpace.Room]: dataRoom.reducer,
});
