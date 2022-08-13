import { Link } from 'react-router-dom';

import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';


function NotFound(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <div className="page page--gray page--notfound">
      <Header authStatus={authorizationStatus}/>

      <main className="page__main page__main--notfound">
        <div className="page__login-container container">
          <section className="notfound">
            <h1 className="notfound__title">404 Not Found</h1>
            <Link className="locations__item-link" to="/">
              <span>To main page</span>
            </Link>
          </section>
        </div>
      </main>
    </div>);
}

export default NotFound;
