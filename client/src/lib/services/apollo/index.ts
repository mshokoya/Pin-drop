import {
  ApolloClient, InMemoryCache, from, createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {RestLink} from 'apollo-link-rest';

// openTripMap
const extUri = new RestLink({
  endpoints: {
    places:`${process.env.REACT_APP_OPENTRIPMAP_URL}/places/bbox?apikey=${process.env.REACT_APP_OPENTRIPMAP_API_KEY}`,
    geocoding: `${process.env.REACT_APP_MAPBOX_URL}/geocoding/${process.env.REACT_APP_MAPBOX_VERSION}`,
    images: `${process.env.REACT_APP_UNSPLASH_PHOTOS_URL}?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
  }
});

const context = setContext(() => {
  const token = sessionStorage.getItem('token');
  return {
    headers: { 'X-CSRF-TOKEN': token || '' }
  };
});

const httpLink = createHttpLink({ uri: process.env.BACKEND_URI });

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([context,extUri,httpLink]),
});

export {apolloClient}