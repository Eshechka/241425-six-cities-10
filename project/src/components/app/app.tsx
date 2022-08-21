import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import { AppRoute } from '../../const';

import PrivateRoute from '../private-route/private-route';

import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';

import { checkLoginAction } from '../../store/api-actions';
import { store } from '../../store';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';

store.dispatch(checkLoginAction());


function App(): JSX.Element {
  const {authorizationStatus, isAuthorizationChecked} = useAppSelector((state) => state);

  if (isAuthorizationChecked === false) {
    return (
      <Spinner/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main />}
        />
        <Route
          path={AppRoute.Login}
          element={!authorizationStatus ? <Login /> : <Navigate to={AppRoute.Root} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Room}>
          <Route index element={<Navigate to={AppRoute.Root} />} />
          <Route path=':id' element={<Room />} />
        </Route>
        <Route
          path={AppRoute.NotFound}
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
