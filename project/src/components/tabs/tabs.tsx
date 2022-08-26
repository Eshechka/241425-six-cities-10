import cn from 'classnames';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/data-offers/data-offers';

import { getCity } from '../../store/data-offers/selectors';

import { City } from '../../types/city';

type tabsProps = {
  cities: City[],
  onChangeTab: (city: City) => void,
};

function Tabs(props: tabsProps): JSX.Element {
  const [currentCity, setCurrentCity] = useState(useAppSelector(getCity));

  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {props.cities.map((city: City) =>
            (
              <li className="locations__item" key={city.name}>
                <Link className={cn('locations__item-link tabs__item', {'tabs__item--active': currentCity.name === city.name})}
                  to={AppRoute.Root}
                  onClick={() => {
                    dispatch(changeCity({city}));
                    setCurrentCity(city);
                    props.onChangeTab(city);
                  }}
                >
                  <span>{city.name}</span>
                </Link>
              </li>)
          )}
        </ul>
      </section>
    </div>
  );
}

export default React.memo(Tabs);
