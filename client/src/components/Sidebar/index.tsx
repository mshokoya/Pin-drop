import React from 'react';
import { Header } from './components';
import {PlacesBar} from './components';
import {UPlacesHash, IKind} from '../../lib/utils/types';

interface Props {
  allPlaces?: UPlacesHash;
  newPlaces?: UPlacesHash;
  kinds: IKind;
}

export const Sidebar = React.memo(({allPlaces, newPlaces, kinds}: Props) => {
  return (
    <div className="sidebar">
      <Header />
      <div className='sidebar__head'>
        <div>Pins</div>
        <div>Places</div>
        <div>Comments</div>
      </div>
      <div className='sidebar__comp'>
        <PlacesBar allPlaces={allPlaces} newPlaces={newPlaces} kinds={kinds}/>
      </div>
    </div>
  )
});
