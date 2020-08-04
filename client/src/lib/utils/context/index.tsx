import React, { useReducer, Reducer, createContext } from 'react';
import { StateProviderProps } from './types';
import { viewerReducer, ViewerAction } from '../reducers';
import { Viewer } from '../../graphql/types';

export let AppContext: React.Context<{
  viewerState: void | Viewer;
  viewerDispatch: React.Dispatch<ViewerAction>;
}>;

export const StateProvider = ({ children }: StateProviderProps): JSX.Element => {
  const [viewerState, viewerDispatch] = (
    useReducer<Reducer<(Viewer|void), ViewerAction>>(viewerReducer, undefined)
  );
  AppContext = createContext({ viewerState, viewerDispatch });

  return (
    <AppContext.Provider value={{
      viewerState,
      viewerDispatch,
    }}
    >
      {children}
    </AppContext.Provider>
  );
};
