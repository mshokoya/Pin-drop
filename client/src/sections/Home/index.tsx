import React, {useState, useEffect, useRef} from 'react';
import {useLazyQuery} from '@apollo/client';
import useDeepEffect from '../../lib/utils/hooks/useDeepEffect';
import { Sidebar } from '../../components/Sidebar';
import {Map} from '../../components/Map';
import mapboxgl from 'mapbox-gl';
import {fetchPlacesHook, IFetchPlaces} from '../../lib/utils/hooks/openTripApiHook';
import {IPos} from './types';

const DEFAULT_LOCATION = {
  longitude: -2.245319,
  latitude: 53.476605
}
const DEFAULT_ZOOM = 15
const DEFAULT_STREET_VIEW = "mapbox://styles/mapbox/streets-v11"

export const Home = () => {
  const [map, setMap] = useState<mapboxgl.Map|null>(null);
  const [pos, setPos] = useState<IPos|null>(null)
  const mapContainer = useRef<HTMLElement|null>(null);

  useEffect(() => {
    pageSetup(mapInit)
  }, []);

  useDeepEffect(async() => {
    await fetchPlacesHook({
      maxLat: pos!.maxLat, 
      minLat: pos!.minLat,
      maxLng: pos!.maxLng,
      minLng: pos!.minLng,
    })
  }, [pos]);

  const pageSetup = (callback: any) => {
  if (navigator.geolocation && navigator.permissions){  
    navigator.permissions.query({name:'geolocation'}).then((result) => {
      if (result.state === 'prompt' ){
        callback()
        getLocation(callback)
      } else if (result.state === 'granted') {
        getLocation(callback) 
      } else {
        callback()
      }
    })
  } else {
    callback()
  }
}

  const getLocation = (callback: any): void => {
    navigator.geolocation.getCurrentPosition((vals) => {
      const {latitude, longitude} = vals.coords;
      callback(longitude, latitude);
    });
  }

  const mapInit = (longitude?: number, latitude?: number) => {
    const map = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      zoom: DEFAULT_ZOOM,
      center: {
        lng: longitude || DEFAULT_LOCATION.longitude , 
        lat: latitude || DEFAULT_LOCATION.latitude
      },
      style: DEFAULT_STREET_VIEW
    });

    map.on('load', async () => {
      // @ts-ignore
    const {_ne, _sw} = map.getBounds();
    const zoom = map.getZoom()
    setPos({
      maxLat: _ne.lat, 
      minLat: _sw.lat,
      minLng: _sw.lng,
      maxLng: _ne.lng,
      zoom
    });
    })

    map.on('dragend', () => {
      // @ts-ignore
      const {_ne, _sw} = map.getBounds();
      const zoom = map.getZoom()
      setPos({
        maxLat: _ne.lat, 
        minLat: _sw.lat,
        minLng: _sw.lng,
        maxLng: _ne.lng,
        zoom
      });
    });

    // map.on('zoom', () => {

    // })
    setMap(map)
  }

  return (<div className='home'>
    <Sidebar />
    <Map map={mapContainer}/>
  </div>)
};


// const pageSetup = (callback: any) => {
//   if (navigator.geolocation && navigator.permissions){  
//     navigator.permissions.query({name:'geolocation'}).then((result) => {
//       if (result.state === 'prompt' ){
//         callback()
//         getLocation(callback)
//       } else if (result.state === 'granted') {
//         getLocation(callback) 
//       } else {
//         callback()
//       }
//     })
//   } else {
//     callback()
//   }
// }