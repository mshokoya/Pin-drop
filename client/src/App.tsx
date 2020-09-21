import React, {useContext} from 'react';
import { Home } from './sections/Home';
import { useQuery } from '@apollo/client';
import { loginUserQuery } from './lib/graphql';
import { QueryLoginArgs, LoginUserQueryQuery } from './lib/graphql/types';

import { AppContext } from './lib/utils/context';
import { ViewerActionTypes } from './lib/utils/reducers';

export const App = () => {
  const { viewerDispatch } = useContext(AppContext);

  useQuery<LoginUserQueryQuery, QueryLoginArgs>(loginUserQuery, {
    variables: {
      input: {
        email: 'test12@test.com',
        password: 'test12',
      },
    },
    onCompleted: (data) => {
      if (data.login && data.login) {
        viewerDispatch({
          type: ViewerActionTypes.CREATE_VIEWER,
          payload: data.login,
        });
        if (data.login.token) {
          sessionStorage.setItem('token', data.login.token);
        }
      } else {
        sessionStorage.removeItem('token');
      }
    },
  });

  return <Home />
};
