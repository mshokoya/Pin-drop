import React, {useState, useRef} from 'react';
import useDeepEffect from '../../lib/utils/hooks/useDeepEffect';
import { Sidebar } from '../../components/Sidebar';
import {Map} from '../../components/Map';
import {fetchPlacesHook} from '../../lib/utils/hooks/openTripApiHook';
import {IPos} from './types';
import {IPlaces} from '../../lib/utils/types';
import HashMap from '../../lib/utils/helpers/hashMap';

type I = {[key: string]: IPlaces}

export const Home = () => {
  const [pos, setPos] = useState<IPos|null>(null)
  const [allPlaces, setAllPlaces] = useState<I|null>(null)
  const [newPlaces, setNewPlaces] = useState<I|null>(null)
  const hashmap = useRef<HashMap<IPlaces>>(new HashMap<IPlaces>('id'));

  useDeepEffect(async() => {
      try {
        const res = await fetchPlacesHook({
          maxLat: pos!.maxLat, 
          minLat: pos!.minLat,
          maxLng: pos!.maxLng,
          minLng: pos!.minLng,
        });
        
        if (res.data && res.data.places){
          setNewPlaces(hashmap.current.newValuesOnly(res.data.places.features))
        }
        setAllPlaces(hashmap.current.hashmap)
      } catch (error) {
        console.log('error')
      }

  }, [pos]);


  return (
    <div className='home'>
      <Sidebar />
      <Map setPos={setPos} pos={pos} places={newPlaces} key='1'/>
    </div>
  )
};