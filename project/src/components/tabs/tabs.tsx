import cn from 'classnames';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { changeCity } from '../../store/action';

import { City } from '../../types/city';

type tabsProps = {
  cities: City[],
  onChangeTab: (city: City) => void,
};

function Tabs(props: tabsProps): JSX.Element {
  const [currentCity, setCurrentCity] = useState(useAppSelector((state) => state.city));

  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {props.cities.map((city: City) =>
            (
              <li className="locations__item" key={city.name}>
                <Link className={cn('locations__item-link tabs__item', {'tabs__item--active': currentCity.name === city.name})}
                  to="/"
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

export default Tabs;
