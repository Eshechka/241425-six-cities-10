import cn from 'classnames';

import { useState } from 'react';
import { FilterType } from '../../const';

type sortingProps = {
  onSort: (filterType: string) => void
};


function Sorting(props: sortingProps): JSX.Element {
  const [currentFilter, serCurrentFilter] = useState(FilterType[0]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpenFilter(!isOpenFilter)}
      >
        {currentFilter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options places__options--custom', {'places__options--opened': isOpenFilter})}>
        {
          FilterType.map((filterType) => (
            <li
              key={filterType}
              className={cn('places__option', {'places__option--active':  currentFilter === filterType})}
              tabIndex={0}
              onClick={
                () => {
                  serCurrentFilter(filterType);
                  setIsOpenFilter(false);
                  props.onSort(filterType);
                }
              }
            >
              {filterType}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default Sorting;
