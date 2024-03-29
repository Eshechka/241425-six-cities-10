import { City } from './city';
import { Host } from './host';
import { Location } from './location';

export type Offer = {
  id: string;
  previewImage: string;
  price: number;
  isFavorite: boolean;
  rating: number;
  title: string;
  description: string;
  type: string;
  city: City;
  isPremium: boolean,
  images?: string[],
  bedrooms?: number,
  maxAdults?: number,
  goods?: string[],
  host: Host,
  location: Location;
};

