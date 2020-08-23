import React, {useEffect, useRef, useState, memo} from 'react';
import useDeepEffect from '../../lib/utils/hooks/useDeepEffect';
import {IPos} from './types';
import mapboxgl from 'mapbox-gl';

interface Props {
  pos?: IPos;
  setPos: React.Dispatch<React.SetStateAction<IPos | undefined>>;
  places: any;
}

const DEFAULT_LOCATION = {
  longitude: -2.245319,
  latitude: 53.476605
}
const DEFAULT_ZOOM = 15;
const DEFAULT_STREET_VIEW = "mapbox://styles/mapbox/streets-v11";

export const Map = ({pos, setPos, places}: Props) => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapContainer = useRef<HTMLElement|null>(null);

  useEffect(() => {
    pageSetup(mapInit);
  }, []);

  useDeepEffect(() => {
    if (map !== undefined) {
      for (let key in places){
        new mapboxgl.Marker()
        .setLngLat(places[key].geometry.coordinates)
        .addTo(map);
      }
    }
  }, [places]);

  useDeepEffect(() => {
    map!.on('zoomend', () => {
      // @ts-ignore
      const {_ne, _sw} = map!.getBounds();
      const zoom = map!.getZoom();
      if (
        pos && (
          _ne.lat > pos.maxLat ||
          _ne.lng > pos.maxLng ||
          _sw.lat < pos.minLat ||
          _sw.lng < pos.minLng 
        )
      ) {
        setPos({
          maxLat: _ne.lat,
          maxLng: _ne.lng,
          minLat: _sw.lat,
          minLng: _sw.lng,
          zoom
        });
      }
    })
  }, [pos])

  const pageSetup = (callback: any) => {
    if (navigator.geolocation && navigator.permissions){  
      navigator.permissions.query({name:'geolocation'}).then((result) => {
        if (result.state === 'prompt'){
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
        maxLng: _ne.lng,
        minLat: _sw.lat,
        minLng: _sw.lng,
        zoom
      });
    })
  
    map.on('dragend', () => {
      // @ts-ignore
      const {_ne, _sw} = map.getBounds();
      const zoom = map.getZoom();
      setPos({
        maxLat: _ne.lat,
        maxLng: _ne.lng,
        minLat: _sw.lat,
        minLng: _sw.lng,
        zoom
      });
    });

    setMap(map);
  }
  
  return <div className='map' ref={el => (mapContainer.current = el)}/>
};