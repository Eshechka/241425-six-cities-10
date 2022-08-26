import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';


export const getRoom = (state: State): Offer | null => state[NameSpace.Room].room;
export const getRoomReviews = (state: State): Review[] => state[NameSpace.Room].roomReviews;
export const getRoomsNearby = (state: State): Offer[] => state[NameSpace.Room].roomsNearby;
export const getNotFoundStatus = (state: State): boolean => state[NameSpace.Room].notFoundError;
export const getLoadingDataRoomStatus = (state: State): boolean => state[NameSpace.Room].isDataLoading;
