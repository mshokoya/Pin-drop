// import {gql, ApolloQueryResult} from '@apollo/client';
// import {apolloClient} from '../../services/apollo';
// import {IUnsplash} from '../types';
// import imagesjson from '../images.json';


// export const fetchImagesHook = async (location?: string): Promise<ApolloQueryResult<IUnsplash>> => {
//   console.log('called')
//   const query = gql`
//     query images {
//       images @rest(type: "Images", endpoint: "images", path: "&query=${location || 'manchester'}&per_page=30") {
//         total
//         results{
//           urls
//         }
//       }
//     }
//   `
  
//   return await apolloClient.query<IUnsplash>({query, fetchPolicy: 'network-only'});
// }

import {gql} from '@apollo/client';
import imagesjson from '../images.json';


export const fetchImagesHook = async (location?: string) => {
  const query = gql`
    query images {
      images @rest(type: "Images", endpoint: "images", path: "&query=${location || 'manchester'}&per_page=30") {
        total
        results{
          urls
        }
      }
    }
  `
  

  const data = {images: imagesjson}
  const loading = 'sadasd'
  const error = 'dsadsad'


  return {data, loading, error}
}