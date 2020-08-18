import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { ApolloProvider } from '@apollo/client';
import * as serviceWorker from './serviceWorker';
import { App } from './App';
import { StateProvider } from './lib/utils/context';
import { apolloClient } from './lib/services/apollo';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string;

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <React.StrictMode>
      <StateProvider>
        <App />
      </StateProvider>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
