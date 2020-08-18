import {gql} from '@apollo/client';
import {apolloClient} from '../../services/apollo';

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
  
  const {data, loading, error,} = await apolloClient.query({query});
  console.log({data, loading, error})

  return {data, loading, error}
}