import React, {useState} from 'react';
import _isEmpty from 'lodash.isempty';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

interface Args {
  kindsList: string[];
  kindsFilter: {[key: string]:boolean};
  applyFilter: (filter: {[key: string]:boolean}) => void
}

export const FilterBox = ({kindsList, kindsFilter, applyFilter}: Args) => {
  const [filter, setFilter] = useState<{[key: string]: boolean}>(kindsFilter);
  const [toggle, setToggle] = useState<boolean>(false);
  
  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    // @ts-ignore
    if (filter[e.target.textContent]) {
      const filterCopy = {...filter}
      // @ts-ignore
      delete filterCopy[e.target.textContent] // worse performance
      setFilter(filterCopy);
    } else {
      setFilter({
        ...filter,
        // @ts-ignore
        [e.target.textContent]: true
      })
    }
  }

  const handleSubmit = () => {
    applyFilter(filter);
  }

  return (
    <div className='filter'>
      <div className='filter__toggle' onClick={() => setToggle(!toggle)}>
        <FontAwesomeIcon icon={faFilter} className='filter__toggle-button'/>
      </div>
      {toggle && (
        <div className='filter__list-wrap'>
          <div className='filter__list'>
            {kindsList.map((k, idx) => (
              <div 
                key={idx} 
                onClick={handleClick} 
                className={`filter__list-item ${filter[k] && 'filter__selected'}`} >
                {k}
              </div>
            ))}
          </div>
          <button disabled={
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