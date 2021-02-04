import React, {useState} from 'react';
import _isEmpty from 'lodash.isempty';
import {UPlacesHash} from '../../lib/utils/types';

interface Args {
  kindsList: string[];
  kindsFilter: {[key: string]:boolean};
  applyFilter: (filter: {[key: string]:boolean}) => void
  allPlaces: UPlacesHash
  toggle: boolean
}

export const FilterBox = ({kindsList, kindsFilter, applyFilter, toggle}: Args) => {
  const [filter, setFilter] = useState<{[key: string]: boolean}>(kindsFilter);
  
  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, kind: string) => {
    // @ts-ignore
    if (filter[kind]) {
      const filterCopy = {...filter}
      // @ts-ignore
      delete filterCopy[kind] // worse performance
      setFilter(filterCopy);
    } else {
      setFilter({
        ...filter,
        // @ts-ignore
        [kind]: true
      })
    }
  }

  const handleSubmit = () => {
    applyFilter(filter);
  }

  return (
    <div className='filter'>
      {toggle && (
        <div className='filter__list-wrap'>
          <div className='filter__list'>
            {kindsList.map((k, idx) => (
              <div 
                key={idx} 
                onClick={(e) => handleClick(e, k)}
                className={`filter__list-item${filter[k] ? ' filter__selected': ''}`} >
                
                {k.replaceAll('_', ' ')}
              </div>
            ))}
          </div>
          <button type='button' disabled={
            _isEmpty(filter) 
            && _isEmpty(kindsFilter)
            } 
            onClick={handleSubmit}
          >
          Apply
          </button>
        </div>
      )}
    </div>
  );
}