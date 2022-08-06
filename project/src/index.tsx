import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { store } from './store';

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
    <Provider store = {store}>
      <App
        offers={Settings.offers}
        reviews={Settings.reviews}
        authStatus={Settings.authStatus}
      />
    </Provider>
  </React.StrictMode>,
);
