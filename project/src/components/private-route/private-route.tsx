import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-process/selectors';

type privateRouteProps = {
  children: JSX.Element,
};

function PrivateRoute(props: privateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth ? props.children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
