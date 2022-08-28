import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { FilterType, FilterTypes } from '../../const';

type sortingProps = {
  onSort: (newFilterType: FilterType) => void,
  filterBy: FilterType,
};


function Sorting(props: sortingProps): JSX.Element {
  const [currentFilter, setCurrentFilter] = useState(props.filterBy);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  useEffect(() => {
    setCurrentFilter(props.filterBy);
  }, [props.filterBy]);

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
          FilterTypes.map((filterType) => (
            <li
              key={filterType}
              className={cn('places__option', {'places__option--active':  currentFilter === filterType})}
              tabIndex={0}
              onClick={
                () => {
                  setCurrentFilter(filterType);
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

export default React.memo(Sorting);
