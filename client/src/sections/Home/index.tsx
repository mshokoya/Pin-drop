import React, {useState, useRef} from 'react';
import useDeepEffect from '../../lib/utils/hooks/useDeepEffect';
import { Sidebar } from '../../components/Sidebar';
import {Map} from '../../components/Map';
import {fetchPlacesHook} from '../../lib/utils/hooks/openTripApiHook';
import {IPos} from './types';
import {UPlacesHash, IKind} from '../../lib/utils/types';
import {hashPlacesObj} from '../../lib/utils/helpers/hashPlacesObj';

export const Home = () => {
  const [pos, setPos] = useState<IPos>()
  const [allPlaces, setAllPlaces] = useState<UPlacesHash>({})
  const [newPlaces, setNewPlaces] = useState<UPlacesHash>({})
  const [allKinds, setAllKinds] = useState<IKind>({})

  useDeepEffect(async() => {
    if (pos){
      try {
        const res = await fetchPlacesHook({
          maxLat: pos.maxLat, 
          minLat: pos.minLat,
          maxLng: pos.maxLng,
          minLng: pos.minLng,
        });
        
        if (res.data && res.data.places){
          const {newPlaces, hash, kinds} = hashPlacesObj({
            places: res.data.places.features, 
            hash: allPlaces,
            kinds: allKinds
          });
          setNewPlaces(newPlaces);
          setAllKinds({...kinds});
          setAllPlaces(hash);
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }, [pos]);


  return (
    <div className='home'>
      <Sidebar allPlaces={allPlaces} newPlaces={newPlaces} kinds={allKinds} />
      <Map setPos={setPos} pos={pos} places={newPlaces} key='1'/>
    </div>
  )
};