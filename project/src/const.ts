export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
}

export enum AuthorizationStatus {
  NoAuth = 'NOAUTH',
  Auth = 'AUTH',
}

export enum OfferItemViews {
  Standart = 'standart',
  Favorite = 'favorite',
  Near = 'near',
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const formatDate = (data: string): string => {
  const formatData = new Date(data);

  return `${MONTHS[formatData.getMonth()]} ${formatData.getFullYear()}`;
};

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 20
    }
  },
];
