import React, {useEffect, useRef, useState, memo, MutableRefObject} from 'react';
import useDeepEffect from '../../lib/utils/hooks/useDeepEffect';
import {IPos} from './types';
import {IKind, UPlacesHash, PLACES_HASH_START} from '../../lib/utils/types';
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
  setAllPlaces: React.Dispatch<UPlacesHash>
}

const DEFAULT_LOCATION = {
  longitude: -2.245319,
  latitude: 53.476605
}
const DEFAULT_ZOOM = 15;
const DEFAULT_STREET_VIEW = "mapbox://styles/mapbox/streets-v11";

// TODO turn markers into hashmap with id as key, this is for optimised mapping
export const Map = ({pos, setPos, newPlaces, allPlaces, kindsFilter, allKinds, setAllPlaces}: Props) => {
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const filterMarkersRef = useRef<mapboxgl.Marker[]>([])
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapContainer = useRef<HTMLElement|null>(null);

  useEffect(() => {
    // renders maps, gets location and adds markers to map
    pageSetup(mapInit);
  }, []);

  useDeepEffect(() => {
    // if filter is empty then we remove all markers on map
    !_isEmpty(filterMarkersRef.current) && removeMarkers(filterMarkersRef);

    // if the map has been rendered and there are no filters add markers to map
    // else if there are filters, remove all markers and only render filter markers on map
    if (!_isEmpty(map) && _isEmpty(kindsFilter)) {
      //  if no markers on map then then render all markers
      //  if markers are on map then only render markers for new places
      _isEmpty(markersRef.current) 
        ? createMarkers(markersRef, allPlaces)
        : createMarkers(markersRef, newPlaces)
    } else if (!_isEmpty(kindsFilter)){
      kindPlaceFilter((id) => {
        // renders markers on map
        filterMarkersRef.current.push(
          new mapboxgl.Marker()
            .setLngLat(allPlaces.hash[id].geometry.coordinates)
            .addTo(map!)
        )
      })
      removeMarkers(markersRef)
    }
  }, [newPlaces, kindsFilter]);

  /* 
    TODO not working... fix it!!!
    this is suppose to prevent pointless api calls when zoom into map 
    as no new places will be found.
  */
  useDeepEffect(() => {
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

  /* 
    attempts to access the geolocation browser api.
    when user is promted to grant access to location. initially map will 
    render with default location. once granted access map will re-render
    with users location
  */
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
  
  // retrives user location once granted access
  const getLocation = (callback: any): void => {
    navigator.geolocation.getCurrentPosition((vals) => {
      const {latitude, longitude} = vals.coords;
      callback(longitude, latitude);
    });
  }
  
  // renders maps and all its settings
  const mapInit = (longitude?: number, latitude?: number) => {
    if (map) {removeMarkers(markersRef)}
    if (!_isEmpty(allPlaces.hash)) setAllPlaces({hash: {}, length: 0});

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

  const removeMarkers = (mL:MutableRefObject<mapboxgl.Marker[]>) => {
    mL.current.forEach((m) => {
      m.remove()
    })
    mL.current = [];
  };

  const createMarkers = (mL:MutableRefObject<mapboxgl.Marker[]>, hash: UPlacesHash) => {
    
    _map(hash.hash, (_hV, hK) => {
      mL.current.push(
        new mapboxgl.Marker()
        .setLngLat(hash.hash[hK].geometry.coordinates)
        .addTo(map!)
      )
    })
  }

  const kindPlaceFilter = (
    callback: (value: string) => void
  ) => {
    _map(kindsFilter, (_oV, oK)=> {
      _map(allKinds[oK].hash, (_iV, iK) => {
        callback(iK)
      });
    });
  }

  
  return <div className='map' ref={el => (mapContainer.current = el)}/>
};