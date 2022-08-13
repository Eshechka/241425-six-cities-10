import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';

import { AppRoute } from '../../const';

import PrivateRoute from '../private-route/private-route';

import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import Spinner from '../spinner/spinner';

import { Review } from '../../types/review';
import { useAppSelector } from '../../hooks';

type Settings = {
  reviews: Review[],
}

function App(props: Settings): JSX.Element {
  const {offers, favoriteOffers, isDataLoaded, authorizationStatus} = useAppSelector((state) => state);

  if (!isDataLoaded) {
    return (
      <Spinner/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main offers={offers} />}
        />
        <Route
          path={AppRoute.Login}
          element={!authorizationStatus ? <Login /> : <Navigate to={AppRoute.Root} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites offers={favoriteOffers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Room}>
          <Route index element={<Navigate to={AppRoute.Root} />} />
          <Route path=':id' element={<Room offers={offers} reviews={props.reviews} />} />
        </Route>
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
