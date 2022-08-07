import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';

import PrivateRoute from '../private-route/private-route';

import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';

import { Review } from '../../types/review';
import { useAppSelector } from '../../hooks';

type Settings = {
  reviews: Review[],
  authStatus: AuthorizationStatus,
}

function App(props: Settings): JSX.Element {
  const offers = useAppSelector((state) => state.offers);

  const favoriteOffers = offers.filter((favoriteOffer) => favoriteOffer.isFavorite === true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main offers={offers} authStatus={props.authStatus} />}
        />
        <Route
          path={AppRoute.Login}
          element={props.authStatus === AuthorizationStatus.NoAuth ? <Login authStatus={props.authStatus} /> : <Navigate to={AppRoute.Root} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={props.authStatus} >
              <Favorites offers={favoriteOffers} authStatus={props.authStatus} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Room}>
          <Route index element={<Navigate to={AppRoute.Root} />} />
          <Route path=':id' element={<Room offers={offers} reviews={props.reviews} authStatus={props.authStatus}/>} />
        </Route>
        <Route
          path="*"
          element={<NotFound authStatus={props.authStatus} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
