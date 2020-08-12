import React from 'react';
import { useUserFetch } from './lib/utils/hooks';
import { Home } from './sections/Home';
import { StateProvider } from './lib/utils/context';

export const App = () => {
  useUserFetch();

  return (
    <StateProvider>
      <Home />
    </StateProvider>
  );
};
