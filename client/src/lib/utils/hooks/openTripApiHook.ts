import {gql} from '@apollo/client';
import {apolloClient} from '../../services/apollo';
import {IPlacesQuery} from '../types';

export interface IFetchPlaces {
  maxLat: number;
  minLat: number; 
  maxLng: number;
  minLng: number;
  kind?: string;
}

export const fetchPlacesHook = async ({maxLat, minLat, maxLng, minLng,kind}: IFetchPlaces) => {
  const query = gql`
    query places {
      places @rest(type: "Places", endpoint: "places", path: "&lat_max=${maxLat}&lat_min=${minLat}&lon_max=${maxLng}&lon_min=${minLng}${kind && '&kind='+kind || ''}") {
        type
        features
      }
    }
  `
  
  const {data, loading, error} = await apolloClient.query<IPlacesQuery>({query, fetchPolicy: 'network-only'});
  // @ts-ignore
  

  return JSON.parse(JSON.stringify({data, loading, error}))
}