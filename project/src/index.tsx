import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { reviews } from './mocks/reviews';
import { store } from './store';
import {checkLoginAction, setFavoriteOffersAction, setOffersAction} from './store/api-actions';

store.dispatch(checkLoginAction());
store.dispatch(setOffersAction());
store.dispatch(setFavoriteOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Settings = {
  reviews: reviews,
};


root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage/>
      <App
        reviews={Settings.reviews}
      />
    </Provider>
  </React.StrictMode>,
);
