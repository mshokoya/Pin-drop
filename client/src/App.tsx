import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header';
import { useUserFetch } from './lib/utils/hooks';
import { Home } from './sections/Home';
import { StateProvider } from './lib/utils/context';

export const App = () => {
  useUserFetch();

  return (
    <StateProvider>
      <Router>
        <Header />
        <Home />
      </Router>
    </StateProvider>
  );
};
