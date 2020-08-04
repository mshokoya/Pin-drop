import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider, ApolloClient, InMemoryCache, from, createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as serviceWorker from './serviceWorker';
import { App } from './App';
import { StateProvider } from './lib/utils/context';

const link1 = setContext(() => {
  const token = sessionStorage.getItem('token');
  return {
    headers: { 'X-CSRF-TOKEN': token || '' },
  };
});

const link2 = createHttpLink({ uri: 'http://localhost:4000/api' });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([link1, link2]),
});

ReactDOM.render(
  <ApolloProvider client={client}>
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
