import React, {useState} from 'react';
import { Header } from './components';
import {PlacesBar} from './components';
import {UPlacesHash, IKind} from '../../lib/utils/types';
import {FilterBox} from '../FilterBox';
import useDeepEqual from '../../lib/utils/hooks/useDeepEffect';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

interface Props {
  allPlaces: UPlacesHash;
  newPlaces?: UPlacesHash;
  kinds: IKind;
  kindsFilter: {[key: string]:boolean};
  setKindsFilter: React.Dispatch<React.SetStateAction<{[key: string]:boolean}>>
}

export const Sidebar = ({allPlaces, newPlaces, kinds, kindsFilter, setKindsFilter}: Props) => {
  const [kindsList, setKindsList] = useState<string[]>(Object.keys(kinds));
  const [toggle, setToggle] = useState<boolean>(false);

  useDeepEqual(() => {
    setKindsList(Object.keys(kinds))
  }, [kinds]);

  const applyKindsFilter = (filter: {[key: string]:boolean}) => {
    setKindsFilter(filter)
  }

  return (
    <div className="sidebar">
      <Header />
      <div className='filter__toggle' >
        <span>{allPlaces.length} places</span>
        <FontAwesomeIcon 
          icon={faFilter} 
          className='filter__toggle-button'
          onClick={() => setToggle(!toggle)}
        />
      </div>

      <div className={`sidebar__comp${!toggle ? ' hide' : ''}`}>
        <FilterBox 
          kindsList={kindsList} 
          kindsFilter={kindsFilter} 
          applyFilter={applyKindsFilter}
          allPlaces={allPlaces}
          toggle={toggle}
        />
      </div>
        <div className={`sidebar__comp${!toggle ? '' : ' hide'}`}>
          <PlacesBar 
            allPlaces={allPlaces} 
            newPlaces={newPlaces} 
            kinds={kinds} 
            kindsFilter={kindsFilter} 
            setKindsFilter={setKindsFilter}
          />
        </div>
    </div>
  )
};
