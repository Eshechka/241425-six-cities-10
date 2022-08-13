import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';

type privateRouteProps = {
  children: JSX.Element,
};

function PrivateRoute(props: privateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authorizationStatus ? props.children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
