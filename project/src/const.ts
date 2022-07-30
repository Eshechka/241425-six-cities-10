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
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const formatDate = (data: string): string => {
  const formatData = new Date(data);

  return `${MONTHS[formatData.getMonth()]} ${formatData.getFullYear()}`;
};
