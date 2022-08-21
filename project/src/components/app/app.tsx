import { Route, Routes, Navigate } from 'react-router-dom';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

import { AppRoute, AuthorizationStatus } from '../../const';

import PrivateRoute from '../private-route/private-route';

import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';

import { checkLoginAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/user-process/selectors';
import { store } from '../../store';
import { useAppSelector } from '../../hooks';
import Spinner from '../spinner/spinner';

store.dispatch(checkLoginAction());


function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <Spinner/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main />}
        />
        <Route
          path={AppRoute.Login}
          element={authorizationStatus !== AuthorizationStatus.Auth ? <Login /> : <Navigate to={AppRoute.Root} />}
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
    </HistoryRouter>
  );
}

export default App;
