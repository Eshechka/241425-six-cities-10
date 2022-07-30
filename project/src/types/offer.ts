import { City } from './city';
import { Host } from './host';

export type Offer = {
  id: string;
  src: string;
  price: number;
  isFavorite: boolean;
  rating: number;
  title: string;
  description: string;
  type: string;
  city: City;
  isPremium?: boolean,
  images?: string[],
  bedrooms?: number,
  maxAdults?: number,
  goods?: string[],
  host?: Host,
  location?: Location;
};


type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}


