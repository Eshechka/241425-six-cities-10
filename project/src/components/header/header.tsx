import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, headerView } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthStatus, getUserInfo } from '../../store/user-process/selectors';

type headerProps = {
  view?: headerView,
  favoriteOffersCount?: number,
};

function Header(props: headerProps): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthStatus);
  const userInfo = useAppSelector(getUserInfo);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ?
                (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${userInfo?.avatarUrl})`, borderRadius: '50%'}}>
                        </div>
                        <span className="header__user-name user__name">{userInfo?.email}</span>
                        <span className="header__favorite-count">{props.favoriteOffersCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link"
                        to={AppRoute.Root}
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction());
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                )
                :
                (props.view !== headerView.WOAuth &&
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
