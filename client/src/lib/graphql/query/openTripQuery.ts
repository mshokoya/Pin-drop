import {gql} from '@apollo/client';

export interface IFetchPlaces {
  maxLat: number;
  minLat: number; 
  maxLng: number;
  minLng: number;
  kind?: string;
}


export const fetchPlacesQuery = ({maxLat, minLat, maxLng, minLng,kind}: IFetchPlaces) => (
  gql`
    query places {
      places @rest(type: "Places", path: "&lat_max=${maxLat}&lat_min=${minLat}&lat_max=${maxLng}lat_min=${minLng}${kind && '&kind='+kind}") {
        name
      }
    }
  `
)