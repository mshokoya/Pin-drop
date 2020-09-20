import React, {useRef, useState} from 'react';
import {UPlacesHash, IKind, IPlacesHash} from '../../../../lib/utils/types';
import useDeepEqual from '../../../../lib/utils/hooks/useDeepEffect';
import {FilterBox} from '../../../FilterBox';
import _map from 'lodash.map';
import _isEmpty from 'lodash.isempty';

interface Props {
  allPlaces: UPlacesHash;
  newPlaces?: UPlacesHash;
  kinds: IKind;
  kindsFilter: {[key: string]:boolean};
  setKindsFilter: React.Dispatch<React.SetStateAction<{[key: string]:boolean}>>
}

export const PlacesBar = ({allPlaces, newPlaces, kinds, kindsFilter, setKindsFilter}: Props) => {
  const [kindsList, setKindsList] = useState<string[]>(Object.keys(kinds));

  useDeepEqual(() => {
    setKindsList(Object.keys(kinds))
  }, [kinds]);

  const applyKindsFilter = (filter: {[key: string]:boolean}) => {
    setKindsFilter(filter)
  }

  const placeComponent = ({hD}: {hD: IPlacesHash}) => (
    <div className='places__location-wrap' key={hD.id}>
      <div className='places__location-name-wrap'>
        <p className='places__location-name'>{hD.properties.name}</p>
      </div>
      <div className='places__location-image-wrap'>
        <img className='places__location-image' src={hD.properties.images?.thumb}/>
      </div>
    </div>
  )

  return (
    <div className='places'>
      <div className='places__interests'>
        <span>Interests</span>
      </div>
      <FilterBox 
        kindsList={kindsList} 
        kindsFilter={kindsFilter} 
        applyFilter={applyKindsFilter}
        allPlaces={allPlaces}
      />

      <div className='places__location'>
          {
            _isEmpty(kindsFilter)
              ? _map(allPlaces.hash, (oV, _oK) => (
                  placeComponent({
                    hD: oV,
                  })
                ))
              : _map(kindsFilter, (_oV, oK) => (
                 _map(kinds[oK].hash, (_iV, iK) => (
                    placeComponent({
                      hD: allPlaces.hash[iK], 
                    })
                 ))
              ))
          }
      </div>
    </div>
  )
}