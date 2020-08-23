import React, {useRef} from 'react';
import {UPlacesHash, IKind} from '../../../../lib/utils/types';
import useDeepEqual from '../../../../lib/utils/hooks/useDeepEffect';

interface Props {
  allPlaces?: UPlacesHash;
  newPlaces?: UPlacesHash;
  kinds: IKind;
}

export const PlacesBar = ({allPlaces, newPlaces, kinds}: Props) => {
  const kindsList = useRef(Object.keys(kinds));

  useDeepEqual(() => {
    kindsList.current = Object.keys(kinds)
    console.log(kindsList.current.length)
  }, [kinds]);

  return (
    <div className='places'>
      <div className='places__interests'>
        <span>Interests</span>
        <div>
          {
            kindsList.current.map((v, idx) => (
              <span className='places__interests-icon' key={idx}>
                {v}
              </span>
            ))
          }
        </div>
      </div>

      <div className='places__location'>
          {
            allPlaces && Object.keys(allPlaces).map((key, idx) => (
              <div className='places__location-wrap' key={idx}>
                <div className='places__location-name-wrap'>
                  <p className='places__location-name'>{allPlaces[key].properties.name}</p>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  )
}