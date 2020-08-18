import {
  ApolloClient, InMemoryCache, from, createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {RestLink} from 'apollo-link-rest';

// openTripMap
const link1 = new RestLink({endpoints: {places:`${process.env.REACT_APP_OPENTRIPMAP_URL}/places/bbox?apikey=${process.env.REACT_APP_OPENTRIPMAP_API_KEY}` }})

const link2 = setContext(() => {
  const token = sessionStorage.getItem('token');
  return {
    headers: { 'X-CSRF-TOKEN': token || '' },
  };
});

const link3 = createHttpLink({ uri: process.env.BACKEND_URI });

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([link1,link2,link3]),
});

export {apolloClient}