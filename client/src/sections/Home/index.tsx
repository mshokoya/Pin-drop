import React, {useState, useMemo} from 'react';
import { Sidebar } from '../../components/Sidebar';
import {Map} from '../../components/Map';
import {fetchPlacesHook, useDeepEffect, fetchImagesHook} from '../../lib/utils/hooks';
import {IPos} from './types';
import {UPlacesHash, IKind} from '../../lib/utils/types';
import {hashPlacesObj} from '../../lib/utils/helpers/hashPlacesObj';


export const Home = () => {
  const [pos, setPos] = useState<IPos>()
  const [allPlaces, setAllPlaces] = useState<UPlacesHash>({})
  const [newPlaces, setNewPlaces] = useState<UPlacesHash>({})
  const [allKinds, setAllKinds] = useState<IKind>({})
  const [kindsFilter, setKindsFilter] = useState<{[key: string]:boolean}>({})
  const images = useMemo(() => fetchImagesHook(), []);

  useDeepEffect(async() => {
    console.log(images)
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
          setAllPlaces(hash);
          setNewPlaces(newPlaces);
          setAllKinds({...kinds});
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }, [pos]);


  return (
    <div className='home'>
      <Sidebar 
        allPlaces={allPlaces} 
        newPlaces={newPlaces} 
        kinds={allKinds}
        kindsFilter={kindsFilter}
        setKindsFilter={setKindsFilter}
      />
      <Map 
        setPos={setPos} 
        pos={pos} 
        newPlaces={newPlaces} 
        kindsFilter={kindsFilter}
        allKinds={allKinds}
        allPlaces={allPlaces}
        setAllPlaces={setAllPlaces}
        key='1'/>
    </div>
  )
};