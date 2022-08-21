import { NameSpace } from '../../const';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';


export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Offers].favoriteOffers;
export const getCity = (state: State): City => state[NameSpace.Offers].city;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Offers].isDataLoading;
