import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Settings = {
  offers: offers,
  reviews: reviews,
  authStatus: AuthorizationStatus.Auth,
};


root.render(
  <React.StrictMode>
    <App
      offers={Settings.offers}
      reviews={Settings.reviews}
      authStatus={Settings.authStatus}
    />
  </React.StrictMode>,
);
