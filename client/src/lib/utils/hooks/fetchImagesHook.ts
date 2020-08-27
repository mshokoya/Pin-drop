import {gql} from '@apollo/client';
import {apolloClient} from '../../services/apollo';
import {IUnsplash} from '../types';


export const fetchImagesHook = async (location?: string) => {
  const query = gql`
    query images {
      images @rest(type: "Images", endpoint: "images", path: "query=${location || 'manchester'}") {
        type
        features
      }
    }
  `
  
  const {data, loading, error} = await apolloClient.query<IUnsplash>({query, fetchPolicy: 'network-only'});
  
  console.log(data)
  

  return JSON.parse(JSON.stringify({data, loading, error}))
}