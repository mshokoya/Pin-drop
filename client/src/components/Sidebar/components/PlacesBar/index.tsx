import React, {useRef, useState} from 'react';
import {UPlacesHash, IKind} from '../../../../lib/utils/types';
import useDeepEqual from '../../../../lib/utils/hooks/useDeepEffect';
import {FilterBox} from '../../../FilterBox';
import _map from 'lodash.map';

interface Props {
  allPlaces?: UPlacesHash;
  newPlaces?: UPlacesHash;
  kinds: IKind;
  kindsFilter: {[key: string]:boolean};
  setKindsFilter: React.Dispatch<React.SetStateAction<{[key: string]:boolean}>>
}

export const PlacesBar = ({allPlaces, newPlaces, kinds, kindsFilter, setKindsFilter}: Props) => {
  // const kindsList = useRef(Object.keys(kinds));
  const [kindsList, setKindsList] = useState<string[]>(Object.keys(kinds));
  // console.log(allPlaces)

  useDeepEqual(() => {
    setKindsList(Object.keys(kinds))
    // console.log(kindsList.length)
  }, [kinds]);

  const applyKindsFilter = (filter: {[key: string]:boolean}) => {
    setKindsFilter(filter)
  }

  return (
    <div className='places'>
      <div className='places__interests'>
        <span>Interests</span>
      </div>
      <FilterBox kindsList={kindsList} kindsFilter={kindsFilter} applyFilter={applyKindsFilter}/>

      <div className='places__location'>
          {
            _map(allPlaces, (hD, idx) => (
              <div className='places__location-wrap' key={idx}>
                <div className='places__location-name-wrap'>
                  <p className='places__location-name'>{hD.properties.name}</p>
                </div>
                <div className='places__location-image-wrap'>
                  <img className='places__location-image' src={hD.properties.images?.thumb}/>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  )
}

// {
//   allPlaces && Object.keys(allPlaces).map((key, idx) => (
//     <div className='places__location-wrap' key={idx}>
//       <div className='places__location-name-wrap'>
//         <p className='places__location-name'>{allPlaces[key].properties.name}</p>
//       </div>
//       <div className='places__location-image-wrap'>
//         <p className='places__location-image'>{allPlaces[key].properties.name}</p>
//       </div>
//     </div>
//   ))
// }