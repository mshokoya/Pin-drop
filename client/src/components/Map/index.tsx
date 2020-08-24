import React, {useEffect, useRef, useState, memo} from 'react';
import useDeepEffect from '../../lib/utils/hooks/useDeepEffect';
import {IPos} from './types';
import {IKind, UPlacesHash} from '../../lib/utils/types';
import mapboxgl from 'mapbox-gl';
import _isEmpty from 'lodash.isempty';
import _map from 'lodash.map';

interface Props {
  pos?: IPos;
  setPos: React.Dispatch<IPos | undefined>;
  newPlaces: UPlacesHash;
  kindsFilter: {[key: string]:boolean};
  allKinds: IKind;
  allPlaces: UPlacesHash
}

const DEFAULT_LOCATION = {
  longitude: -2.245319,
  latitude: 53.476605
}
const DEFAULT_ZOOM = 15;
const DEFAULT_STREET_VIEW = "mapbox://styles/mapbox/streets-v11";

export const Map = ({pos, setPos, newPlaces, allPlaces, kindsFilter, allKinds}: Props) => {
  // turn markers into hashmap with id as key, this is for optimised mapping
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const filterMarkersRef = useRef<mapboxgl.Marker[]>([])
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapContainer = useRef<HTMLElement|null>(null);

  useEffect(() => {
    pageSetup(mapInit);
  }, []);

  useDeepEffect(() => {
    if (!_isEmpty(map) && _isEmpty(kindsFilter)) {
      console.log('eya')
      _isEmpty(markersRef.current) 
        ? createMarkers(markersRef.current, allPlaces)
        : createMarkers(markersRef.current, newPlaces)
    }
  }, [newPlaces]);

  useDeepEffect(() => {
    if (!_isEmpty(kindsFilter)){
      console.log('eyas')
      removeMarkers(filterMarkersRef.current)

      kindPlaceFilter((value) => {
        filterMarkersRef.current.push(
          new mapboxgl.Marker()
            .setLngLat(allPlaces[value].geometry.coordinates)
            .addTo(map!)
        )
      })
      removeMarkers(markersRef.current)
    } else {
      createMarkers(markersRef.current, allPlaces)
    }
  }, [kindsFilter])

  useDeepEffect(() => {
    // not working... fix it!!!
    if (pos){
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
    }
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
    if (map) removeMarkers(markersRef.current);

    const newMap = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      zoom: DEFAULT_ZOOM,
      center: {
        lng: longitude || DEFAULT_LOCATION.longitude , 
        lat: latitude || DEFAULT_LOCATION.latitude
      },
      style: DEFAULT_STREET_VIEW
    });

    newMap.on('load', async () => {
      // @ts-ignore
      const {_ne, _sw} = newMap.getBounds();
      const zoom = newMap.getZoom()
      setPos({
        maxLat: _ne.lat, 
        maxLng: _ne.lng,
        minLat: _sw.lat,
        minLng: _sw.lng,
        zoom
      });
    })
  
    newMap.on('dragend', () => {
      // @ts-ignore
      const {_ne, _sw} = newMap.getBounds();
      const zoom = newMap.getZoom();
      setPos({
        maxLat: _ne.lat,
        maxLng: _ne.lng,
        minLat: _sw.lat,
        minLng: _sw.lng,
        zoom
      });
    });

    setMap(newMap);
  }

  const removeMarkers = (mL:mapboxgl.Marker[]) => {
    mL.forEach((m) => {
      m.remove()
    })
    mL = [];
  };

  const createMarkers = (mL:mapboxgl.Marker[], hash: UPlacesHash) => {
    _map(hash, (hV, hK) => {
      mL.push(
        new mapboxgl.Marker()
        .setLngLat(hash[hK].geometry.coordinates)
        .addTo(map!)
      )
    })
  }

  const kindPlaceFilter = (
    callback: (value: string) => void
  ) => {
    _map(kindsFilter, (oV, oK)=> {
      _map(allKinds[oK], (iV, iK) => {
        callback(iK)
      });
    });
  }

  
  return <div className='map' ref={el => (mapContainer.current = el)}/>
};