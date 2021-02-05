import React from 'react';
import {UPlacesHash, IKind, IPlacesHash} from '../../../../lib/utils/types';
import _map from 'lodash.map';
import _isEmpty from 'lodash.isempty';

interface Props {
  allPlaces: UPlacesHash;
  newPlaces?: UPlacesHash;
  kinds: IKind;
  kindsFilter: {[key: string]:boolean};
  setKindsFilter: React.Dispatch<React.SetStateAction<{[key: string]:boolean}>>
}

export const PlacesBar = ({allPlaces, kinds, kindsFilter}: Props) => {


  const placeComponent = ({hD}: {hD: IPlacesHash}) => (
    <div className='places__location-wrap' key={hD.id}>
      <div className='places__location-name-wrap'>
        <p className='places__location-name'>{hD.properties.name}</p>
      </div>
      <div className='places__location-image-wrap'>
        <img className='places__location-image' src={hD.properties.images?.thumb} alt='filter' />
      </div>
    </div>
  )

  return (
    <div className='places'>
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