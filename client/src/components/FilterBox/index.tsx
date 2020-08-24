import React, {useState} from 'react';
import _isEmpty from 'lodash.isempty';

interface Args {
  kindsList: string[];
  kindsFilter: {[key: string]:boolean};
  applyFilter: (filter: {[key: string]:boolean}) => void
}

export const FilterBox = ({kindsList, kindsFilter, applyFilter}: Args) => {
  const [filter, setFilter] = useState<{[key: string]: boolean}>(kindsFilter)

  
  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    // e.target.textContent
    // @ts-ignore
    // console.log(e.target.textContent)
    
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
      <div className='filter__toggle'>
        toggle filter
      </div>
      <div className='filter__list'>
        {kindsList.map((k, idx) => (
          <span 
            key={idx} 
            onClick={handleClick} 
            className={`filter__lst-item ${filter[k] && 'filter__selected'}`} >
            {k}
          </span>
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
  )
}